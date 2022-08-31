import services from "..";

export default ( milestones ) => {
    const data = [];

    for (const ml of milestones) {
        data.push({
            fields: { 
                'Milestone': ml.title,
                'Company Name': ml[ 'company-name' ],
                'Project': ml[ 'project-name' ],
                'Description': ml.description,
                'Status': { name: ml.status },
                'Assigned To': ml.responsiblePartyFullNames,
                'Private': ml.private ? 1 : 0,
                'Due Date': services.formatter.date.YYYYMMDDto( ml.deadline ),
                'Overdue By (days)': null,
                'Date Completed': ml[ 'created-on' ],
                'Tags': services.formatter.tags.fromTeamWork( ml.tags ),
                'Active Tasks': ml.tasklists.length,
                'Completed Tasks': null,
                'Percent Complete': Number( ml.percentageComplete ),
                'All Tasks': allTasks( ml.tasklists ),
                'ID': Number( ml.id )
            }
        })
    }

    return data;
}

const allTasks = ( tasks ) => {
    let data = [];
    for ( const task of tasks ) {
        data.push( task.id )
    }
    data = data.join( ' ' );
    return data;
}