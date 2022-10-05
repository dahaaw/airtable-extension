module.exports = ( id, project ) => {
    console.log(project)
    const  fields = {};
    if( project.name ) fields.project = project.name;
    if( project.description ) fields.description = project.description;
    if( project.status ) fields.status = project.status;
    if( project.startDate ) fields.date = project.startDate;
    if( project.endDate ) fields[ 'due date' ] = project.endDate;
    if( project[ 'Tags.' ] ) fields[ 'Tags.' ] = project[ 'Tags.' ];
    if( project[ 'company name' ] ) fields[ 'company name' ] = project[ 'company name' ];

    const records = {
        records: [
            { id, fields }
        ]
    }

    return records;
}