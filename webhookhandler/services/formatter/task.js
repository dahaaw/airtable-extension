const services = require( '../' );

module.exports = async ( id, task, dataProject ) => {
    const  fields = {};
    if( task.name ) fields[ 'task name' ] = task.name;
    if( task.description ) fields[ 'task description' ] = task.description;
    if( task.priority ) fields[ 'priority text' ] = task.priority[0].toUpperCase() + task.priority.slice(1);
    if( task.status ) fields.status = task.status;
    if( task.startDate ) fields[ 'start date' ] = task.startDate;
    if( task.dueDate ) fields[ 'due date' ] = task.dueDate;
    if( task.progress !== undefined ) fields.progress = task.progress / 100;
    if( task.estimatedMinutes ) fields[ 'time estimate' ] = task.estimatedMinutes;
    if( task.projectId ){ 
        fields[ 'Project ID' ] = task.projectId;
        const id = await services.helper.getAirtableID( 'Projects', task.projectId );
        fields[ 'project' ] = [ id ];
    }
    if( task.taskListId ){
        fields[ 'Task List ID' ] = task.taskListId;
        const id = await services.helper.getAirtableID( 'Task Lists', task.taskListId );
        fields[ 'task list' ] = [ id ];
    }
    if( dataProject.companyId ){
        fields[ 'Company ID' ] = dataProject.companyId;
        const id = await services.helper.getAirtableID( 'Companies', dataProject.companyId );
        fields[ 'company name' ] = [ id ];
    }
    if( task.status === 'completed' ) fields.Completed = true;
    if( task.dateUpdated ) fields[ 'Last Change' ] = task.dateUpdated;
    if( task.parentId ) fields[ 'parent task id' ] = task.parentId;
    if( task.tags ){
        const IDs = await services.helper.getAirtableIDs( 'Tags', task.tags );
        fields[ 'Tags.' ] = IDs;
    }

    const records = {
        records: [
            { id, fields }
        ]
    }

    return records;
}