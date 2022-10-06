const services = require( '../' );

module.exports = async ( id, time ) => {
    const  fields = {};
    if( time.hours ) fields.Hours = time.hours;
    if( time.minutes ) fields.Minutes = time.minutes;
    if( time.minutes ) fields[ 'Decimal Hours' ] = time.hours + ( time.minutes / 60 );
    if( time.date ) fields.Date = time.date;
    if( time.dateUserPerspective ) fields[ 'Date/Time' ] = time.dateUserPerspective;
    if( time.description ) fields.Description = time.description;
    if( time.billable !== undefined ) fields[ 'Is it Billable' ] = time.billable;
    if( time.userId ) fields[ 'User ID' ] = time.userId;
    if( time.projectId ){
        const id = await services.helper.getAirtableID( 'Projects', time.projectId );
        fields[ 'Project' ] = [ id ]
    }
    if( time.taskId ){
        const id = await services.helper.getAirtableID( 'All Tasks', time.taskId );
        fields[ 'Task' ] = [ id ];
    }
    if( time.tags ){
        const IDs = await services.helper.getAirtableIDs( 'Tags', time.tags );
        fields[ 'Tags' ] = IDs;
    }
    if( time.dateUpdated ) fields[ 'Updated Date'] = time.dateUpdated;

    const records = {
        records: [
            { id, fields }
        ]
    }

    return records;
}