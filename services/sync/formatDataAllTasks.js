import services from "..";

export default ( tasks ) => {
    const data = [];
    for (const task of tasks) {
        data.push({
            fields: { 
                ID: Number( task.id ),
                'company name': task[ 'company-name' ],
                'project': task[ 'project-name' ],
                'description': task.description,
                'task list': null,
                'task list description': null,
                'milestone': null,
                'status': { name: task.status },
                'task name': task[ 'content' ],
                'task description': task[ 'description' ],
                'start date': services.formatter.date.YYYYMMDDto( task[ 'start-date' ] ),
                'due date': services.formatter.date.YYYYMMDDto( task[ 'due-date' ] ),
                'assigned to': null,
                'created by': task[ 'creator-firstname' ] + ' ' + task[ 'creator-lastname' ],
                'date created': task[ 'created-on' ],
                'progress': task[ 'progress' ],
                'priority': priorityNumber( task[ 'priority' ] ),
                'private': task[ 'private' ],
                'time estimate': task[ 'estimated-minutes' ],
                'billable minutes': null,
                'non billable minutes': null,
                'tags': task.tags ? services.formatter.tags.fromTeamWork( task.tags ) : null,
                'board column': task[ 'boardColumn' ]?.name,
                'parent task id': task[ 'parentTaskId' ] ? Number( task[ 'parentTaskId' ] ) : null,
                'priority text': task[ 'priority' ] ? { name: task[ 'priority' ][0].toUpperCase() + task[ 'priority' ].slice(1) } : null,
                'completed date': null,
                'completed by': null,
                'time': null,
            }
        })
    }
    
    return data;
}

const priorityNumber = ( priority ) => {
    let num;
    if ( priority == 'Hight' ) num = 1;
    if ( priority == 'Medium' ) num = 100;
    if ( priority == 'Low' ) num = 200;

    return num;
}