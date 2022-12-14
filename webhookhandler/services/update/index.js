const services = require( '../' );

module.exports = async ( data ) => {
    console.log( data )
    if( data.project && !data.task ) {
        /* If project only,
        ** prevent update task action get into this project action
        ** because data.task send data.project too */
        const id = await getAirtableID( 'Projects', data.project.id );
        if( !id ) return;

        const companyId = await getAirtableIDs( 'Companies', [ { id: data.project.companyId } ] );
        data.project[ 'company name' ] = companyId;

        const tags = await getAirtableIDs( 'Tags', data.project.tags );
        data.project[ 'Tags.'] = tags;

        const records = services.formatter.project( id, data.project );
        services.fetch.patch( 'Projects', records );
    }

    if( data.milestone ){
        const id = await getAirtableID( 'Milestones', data.milestone.id );
        if( !id ) return;

        const records = services.formatter.milestone( id, data.milestone );
        services.fetch.patch( 'Milestones', records );
    }

    if( data.task ){
        const id = await getAirtableID( 'All Tasks', data.task.id );
        if( !id ) return;

        const records = await services.formatter.task( id, data.task, data.project );

        // USER ASSIGNMENT ON TASK
        if( data.users ){
            const userIds = await getAirtableIDs( 'People', data.users );

            records.records[0].fields[ 'assigned to' ] = userIds;
            records.records[0].fields[ 'Responsible Firstname' ] = data.users?.[ 0 ]?.firstName;
            records.records[0].fields[ 'Responsible Lastname' ] = data.users?.[ 0 ]?.lastName;
        }

        services.fetch.patch( 'All Tasks', records );
    }

    if( data.time ){
        const id = await getAirtableID( 'Time', data.time.id );
        if( !id ) return;

        const records = await services.formatter.time( id, data.time );
        services.fetch.patch( 'Time', records );
    }

    // because task update send data tasklist too
    if( data.taskList && !data.task && !data.project ){
        const id = await getAirtableID( 'Task Lists', data.taskList.id );
        if( !id ) return;

        records = await services.formatter.taskList( id, data.taskList );
        services.fetch.patch( 'Task Lists', records );
    }

    // console.log( data )
}

const getAirtableID = async ( table, ID ) => {
    const airtableData = await services.fetch.get( `${ table }?filterByFormula=ID%3D${ ID }` );
    const id = airtableData?.records?.[0]?.id;
    return id;
}

const getAirtableIDs = async ( table, datas ) => {
    let multipleID = ``;
    for( const data of datas ){
        multipleID += `ID%3D${ data.id }%2C`;
    }
    multipleID = multipleID.slice( 0, -3 );

    const condition = `OR%28${ multipleID }%29`;

    const airtableData = await services.fetch.get( `${ table }?filterByFormula=${ condition }` );
    let IDs = [];
    if( airtableData?.records?.length ){
        for( const record of airtableData.records ){
            IDs.push( record.id );
        }
    }
    return IDs;
}