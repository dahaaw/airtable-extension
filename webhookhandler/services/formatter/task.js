module.exports = ( id, task ) => {
    const  fields = {};
    if( task.name ) fields[ 'task name' ] = task.name;
    if( task.description ) fields[ 'task description' ] = task.description;
    if( task.priority ) fields[ 'priority text' ] = task.priority[0].toUpperCase() + task.priority.slice(1);
    if( task.status ) fields.status = task.status;
    if( task.startDate ) fields[ 'start date' ] = task.startDate;
    if( task.dueDate ) fields[ 'due date' ] = task.dueDate;
    if( task.progress !== undefined ) fields.progress = task.progress / 100;
    if( task.estimatedMinutes ) fields[ 'time estimate' ] = task.estimatedMinutes;

    const records = {
        records: [
            { id, fields }
        ]
    }

    return records;
}