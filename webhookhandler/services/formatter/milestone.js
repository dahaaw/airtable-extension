module.exports = ( id, milestone ) => {
    const  fields = {};
    if( milestone.name ) fields.Milestone = milestone.name;
    if( milestone.description ) fields.Description = milestone.description;
    if( milestone.deadline ) fields[ 'Due Date' ] = milestone.deadline;
    if( milestone.status ) fields.Status = milestone.status;

    const records = {
        records: [
            { id, fields }
        ]
    }

    return records;
}