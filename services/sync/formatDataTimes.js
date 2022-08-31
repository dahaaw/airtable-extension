import services from "..";

export default ( times ) => {
    const data = [];

    for (const time of times) {
        data.push({
            fields: { 
                ID: Number( time.id ),
                Date: time.date,
                'Date/Time': time.dateUserPerspective,
                'End Date/Time': null,
                'Project': time[ 'project-name' ],
                'Who': time[ 'person-first-name'] + ' ' + time[ 'person-last-name' ],
                'Description': time.description,
                'Project Category': null,
                'Company': time[ 'company-name' ],
                'Task List': time[ 'todo-list-name' ],
                'Task': time[ 'todo-item-name' ],
                'Parent Task': time[ 'parentTaskName' ],
                'Is Sub-task': !!Number( time.taskIsSubTask ),
                'Is it Billable': !!Number( time.isbillable ),
                'Hours': Number( time.hours ),
                'Minutes': Number( time.minutes ),
                'Decimal Hours': Number( time.hoursDecimal ),
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