import services from "..";

export default ( tasks ) => {
    const data = [];
    for (const task of tasks) {
        const companyId = services.airtable.record.getIDs( 'Companies', 'ID', task[ 'company-id' ] );
        const projectId = services.airtable.record.getIDs( 'Projects', 'ID', task[ 'project-id' ] );
        const assignedId = services.airtable.record.getIDs( 'People', 'ID', task[ 'responsible-party-ids' ]?.split( ',' ) );
        const creatorId = services.airtable.record.getIDs( 'People', 'ID', task[ 'creator-id' ] );
        const completerId = services.airtable.record.getIDs( 'People', 'ID', task[ 'completer_id' ] );
        const taskListId = services.airtable.record.getIDs( 'Task Lists', 'ID', task[ 'todo-list-id' ] );
        let tagIDs = [];
        if( task.tags?.length ) for (const tg of task.tags ) {
            tagIDs.push( tg.id );
        }

        data.push({
            fields: {
                ID: Number( task.id ),
                'company name': companyId,
                'project': projectId,
                'description': task.description,
                'task list': taskListId,
                'task list description': null,
                'status': { name: task.status },
                'task name': task[ 'content' ],
                'task description': task[ 'description' ],
                'start date': services.formatter.date.YYYYMMDDto( task[ 'start-date' ] ),
                'due date': services.formatter.date.YYYYMMDDto( task[ 'due-date' ] ),
                'assigned to': assignedId,
                'created by': creatorId,
                'date created': task[ 'created-on' ],
                'progress': task[ 'progress' ] ? task[ 'progress' ] / 100 : null,
                'priority': priorityNumber( task[ 'priority' ] ),
                'private': task[ 'private' ],
                'time estimate': task[ 'estimated-minutes' ],
                'billable minutes': null,
                'non billable minutes': null,
                'board column': task[ 'boardColumn' ]?.name,
                'parent task id': task[ 'parentTaskId' ] ? Number( task[ 'parentTaskId' ] ) : null,
                'priority text': task[ 'priority' ] ? { name: task[ 'priority' ][0].toUpperCase() + task[ 'priority' ].slice(1) } : null,
                'completed date': task[ 'completed_on' ],
                'completed by': completerId,
                'Project ID': task[ 'project-id' ],
                'Task List ID': task[ 'todo-list-id' ],
                'Company ID': task[ 'company-id' ],
                'Updater Firstname': task[ 'updater-firstname' ],
                'Updater Lastname': task[ 'updater-lastname' ],
                'Completed': task.completed,
                'Last Change': task[ 'last-changed-on' ],
                'Position': task[ 'position' ],
                'Has Dependencies': task[ 'has-dependencies'],
                'Has Predecessors': task[ 'has-predecessors'],
                'Tags.': services.airtable.record.getIDs( 'Tags', 'ID', tagIDs ),
                'Time Is Logged': task.timeIsLogged,
                'Responsible Firstname': task[ 'responsible-party-firstname' ],
                'Responsible Lastname': task[ 'responsible-party-lastname' ],
            }
        })
    }
    console.log({aaaaaabbbbb:data[0].fields["Tags."]})
    return data;
}

const priorityNumber = ( priority ) => {
    let num;
    if ( priority == 'Hight' ) num = 1;
    if ( priority == 'Medium' ) num = 100;
    if ( priority == 'Low' ) num = 200;

    return num;
}