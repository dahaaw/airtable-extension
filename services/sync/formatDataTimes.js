import services from "..";

export default ( times ) => {
    const data = [];

    for (const time of times) {
        const projectId = services.airtable.record.getIDs( 'Projects', 'ID', time[ 'project-id' ] );
        const whoId = services.airtable.record.getIDs( 'People', 'ID', time[ 'person-id' ] );
        const companyId = services.airtable.record.getIDs( 'Companies', 'ID', time[ 'company-id' ] );
        const taskId = services.airtable.record.getIDs( 'All Tasks', 'ID', time[ 'todo-item-id' ] );
        const parentTaskId = services.airtable.record.getIDs( 'All Tasks', 'ID', time[ 'parentTaskId' ] );
        const tasklistId = services.airtable.record.getIDs( 'Task Lists', 'ID', time.tasklistId );

        data.push({
            fields: { 
                ID: Number( time.id ),
                Date: time.date,
                'Date/Time': time.dateUserPerspective,
                'End Date/Time': null,
                'Project': projectId,
                'Who': whoId,
                'Description': time.description,
                'Project Category': null,
                'Company': companyId,
                'Task List': tasklistId,
                'Task': taskId,
                'Parent Task': parentTaskId,
                'Is Sub-task': !!Number( time.taskIsSubTask ),
                'Is it Billable': !!Number( time.isbillable ),
                'Hours': Number( time.hours ),
                'Minutes': Number( time.minutes ),
                'Decimal Hours': parseFloat( time.hoursDecimal ),
                'Estimated': Number( time.taskEstimatedTime ),
                'Estimated Hours': parseInt( time.taskEstimatedTime / 60 ),
                'Estimated Minutes': time.taskEstimatedTime % 60,
                'Task Tags': services.formatter.tags.fromTeamWork( time[ 'task-tags' ] ),
                'First Name': time[ 'person-first-name'],
                'Last Name': time[ 'person-last-name'],
                'User ID': Number( time[ 'person-id'] ),
                'Task ID': Number( time[ 'todo-item-id' ] ),
            }
        })
    }

    return data;
}