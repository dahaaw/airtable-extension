const services = require( '../' );

module.exports = async ( id, taskList ) => {
    const  fields = {};
    console.log(taskList)
    if( taskList.name ) fields[ 'Task List' ] = taskList.name;
    if( taskList.description ) fields[ 'Description' ] = taskList.description;
    if( taskList.status ) fields[ 'Status' ] = taskList.status;
    if( taskList.projectId ) fields[ 'Project' ] = [ await getAirtableID( 'Projects', taskList.projectId ) ];

    const records = {
        records: [
            { id, fields }
        ]
    }

    return records;
}

const getAirtableID = async ( table, ID ) => {
    const airtableData = await services.fetch.get( `${ table }?filterByFormula=ID%3D${ ID }` );
    const id = airtableData?.records?.[0]?.id;
    return id;
}