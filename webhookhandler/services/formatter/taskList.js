const services = require( '../' );

module.exports = async ( id, taskList ) => {
    const  fields = {};
    if( taskList.name ) fields[ 'Task List' ] = taskList.name;
    if( taskList.description ) fields[ 'Description' ] = taskList.description;
    if( taskList.status ) fields[ 'Status' ] = taskList.status;
    if( taskList.projectId ) fields[ 'Project' ] = [ await services.helper.getAirtableID( 'Projects', taskList.projectId ) ];

    const records = {
        records: [
            { id, fields }
        ]
    }

    return records;
}