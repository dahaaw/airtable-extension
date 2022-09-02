module.exports = ( id, project ) => {
    const  fields = {};
    if( project.name ) fields.project = project.name;
    if( project.description ) fields.description = project.description;
    if( project.status ) fields.status = project.status;
    if( project.startDate ) fields.date = project.startDate;
    if( project.endDate ) fields[ 'due date' ] = project.endDate;

    const records = {
        records: [
            { id, fields }
        ]
    }

    return records;
}