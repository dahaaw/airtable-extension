import { base } from "@airtable/blocks"
import { FieldType } from "@airtable/blocks/models";
import services from "..";

export default async () => {
    // TAGS UPDATE
    let Tags = base.getTableByNameIfExists( 'Tags' );
    if( !Tags ){
        Tags = await services.airtable.table.selectAndCreateIfNotExist( 'Tags' );
        const allTags = await services.fetch.tags.all();
        console.log({allTags})
        await services.sync.addRecords( Tags, allTags.tags );
    }

    // PROJECTS UPDATE
    let Projects = base.getTableByNameIfExists( 'Projects' );
    let ProjectTags = Projects.getFieldByNameIfExists( 'Tags.' );
    if( !ProjectTags ){
        services.logs.forDisplay( 'creating Project tags.' )
        await Projects.createFieldAsync( 'Tags.', FieldType.MULTIPLE_RECORD_LINKS, {
            linkedTableId: Tags.id,
        })
        // full update table Projects
        const allProjects = await services.fetch.project.all();
        await services.sync.addOrUpdate( Projects, allProjects.projects );
    }
    
    // TASKLISTS UPDATE
    let TaskLists = base.getTableByNameIfExists( 'Task Lists');
    let TaskListsUpdate = false;

    let TaskListsPosition = TaskLists.getFieldByNameIfExists( 'Position' );
    if( !TaskListsPosition ){
        services.logs.forDisplay( 'creating Tasklist position' )
        await TaskLists.createFieldAsync( 'Position', FieldType.NUMBER, { precision: 0 } );
        TaskListsUpdate = true;
    }

    let TaskListsProject = TaskLists.getFieldByNameIfExists( 'Project' );
    if( !TaskListsProject ){
        let Projects = base.getTableByNameIfExists( 'Projects' );
        services.logs.forDisplay( 'creating Tasklist project' )
        await TaskLists.createFieldAsync( 'Project', FieldType.MULTIPLE_RECORD_LINKS, {
            linkedTableId: Projects.id,
        });
        TaskListsUpdate = true;
    }

    let TaskListsComplete = TaskLists.getFieldByNameIfExists( 'Complete' );
    if( !TaskListsComplete ){
        services.logs.forDisplay( 'creating Tasklist complete' )
        await TaskLists.createFieldAsync( 'Complete', FieldType.CHECKBOX, { icon: 'check', color: 'greenBright' } );
        TaskListsUpdate = true;
    }

    let TaskListsUncompleted = TaskLists.getFieldByNameIfExists( 'Uncompleted' );
    if( !TaskListsUncompleted ){
        services.logs.forDisplay( 'creating Tasklist uncompleted' )
        await TaskLists.createFieldAsync( 'Uncompleted', FieldType.NUMBER, { precision: 0 } );
        TaskListsUpdate = true;
    }

    let TaskListsStatus = TaskLists.getFieldByNameIfExists( 'Status' );
    if( !TaskListsStatus ){
        services.logs.forDisplay( 'creating Tasklist status' )
        await TaskLists.createFieldAsync( 'Status', FieldType.SINGLE_LINE_TEXT );
        TaskListsUpdate = true;
    }

    if( TaskListsUpdate ){
        const taskLists = await services.fetch.taskList.all();
        await services.sync.addOrUpdate( TaskLists, taskLists[ 'tasklists' ] );
    }

    // TIME UPDATE
    const Time = base.getTableByNameIfExists( 'Time' );
    let TimeUpdate = false;

    let TimeTaskTags = Time.getFieldByNameIfExists( 'Task Tags.' );
    if( !TimeTaskTags ){
        services.logs.forDisplay( 'creating Time task tags.' )
        await Time.createFieldAsync( 'Task Tags.', FieldType.MULTIPLE_RECORD_LINKS, {
            linkedTableId: Tags.id,
        } );
        TimeUpdate = true;
    }

    let TimeUpdatedDate = Time.getFieldByNameIfExists( 'Updated Date' );
    if( !TimeUpdatedDate ){
        services.logs.forDisplay( 'creating Time updated date' )
        await Time.createFieldAsync( 'Updated Date', FieldType.DATE_TIME, {
            dateFormat: { name: 'iso' }, 
            timeFormat: { name: '24hour' }, 
            timeZone: 'client' 
        } );
        TimeUpdate = true;
    }

    let TimeTags = Time.getFieldByNameIfExists( 'Tags' );
    if( !TimeTags ){
        services.logs.forDisplay( 'creating Time tags' )
        await Time.createFieldAsync( 'Tags', FieldType.MULTIPLE_RECORD_LINKS, {
            linkedTableId: Tags.id,
        } );
        TimeUpdate = true;
    }
    
    if( TimeUpdate ){
        const timeAll = await services.fetch.time.all();
        await services.sync.addOrUpdate( Time, timeAll[ 'time-entries' ] );
    }

    // TASK UPDATES
    const Tasks = base.getTableByNameIfExists( 'All Tasks' );
    let TasksUpdate = false;

    const TaskProjectID = Tasks.getFieldByNameIfExists( 'Project ID' );
    if( !TaskProjectID ){
        services.logs.forDisplay( 'creating All Task project id' );
        await Tasks.createFieldAsync( 'Project ID', FieldType.NUMBER, { precision: 0 } );
        TasksUpdate = true;
    }

    const TaskListID = Tasks.getFieldByNameIfExists( 'Task List ID' );
    if( !TaskListID ){
        services.logs.forDisplay( 'creating All Task list id' );
        await Tasks.createFieldAsync( 'Task List ID', FieldType.NUMBER, { precision: 0 } );
        TasksUpdate = true;
    }

    const TaskCompanyID = Tasks.getFieldByNameIfExists( 'Company ID' );
    if( !TaskCompanyID ){
        services.logs.forDisplay( 'creating All Task company id' );
        await Tasks.createFieldAsync( 'Company ID', FieldType.NUMBER, { precision: 0 } );
        TasksUpdate = true;
    }

    const TaskUpdaterFirst = Tasks.getFieldByNameIfExists( 'Updater Firstname' );
    if( !TaskUpdaterFirst ){
        services.logs.forDisplay( 'creating All Task updater firstname' );
        await Tasks.createFieldAsync( 'Updater Firstname', FieldType.SINGLE_LINE_TEXT );
        TasksUpdate = true;
    }

    const TaskUpdaterLast = Tasks.getFieldByNameIfExists( 'Updater Lastname' );
    if( !TaskUpdaterLast ){
        services.logs.forDisplay( 'creating All Task updater lastname' );
        await Tasks.createFieldAsync( 'Updater Lastname', FieldType.SINGLE_LINE_TEXT );
        TasksUpdate = true;
    }

    const TaskCompleted = Tasks.getFieldByNameIfExists( 'Completed' );
    if( !TaskCompleted ){
        services.logs.forDisplay( 'creating All Task completed' );
        await Tasks.createFieldAsync( 'Completed', FieldType.CHECKBOX, { icon: 'check', color: 'greenBright' } );
        TasksUpdate = true;
    }
    
    const TaskLastChange = Tasks.getFieldByNameIfExists( 'Last Change' );
    if( !TaskLastChange ){
        services.logs.forDisplay( 'creating All Task last change' );
        await Tasks.createFieldAsync( 'Last Change', FieldType.DATE_TIME, {
            dateFormat: { name: 'iso' }, 
            timeFormat: { name: '24hour' }, 
            timeZone: 'client' 
        } );
        TasksUpdate = true;
    }

    const TaskPosition = Tasks.getFieldByNameIfExists( 'Position' );
    if( !TaskPosition ){
        services.logs.forDisplay( 'creating All Task position' );
        await Tasks.createFieldAsync( 'Position', FieldType.NUMBER, { precision: 0 } );
        TasksUpdate = true;
    }

    const TaskHasDependencies = Tasks.getFieldByNameIfExists( 'Has Dependencies' );
    if( !TaskHasDependencies ){
        services.logs.forDisplay( 'creating All Task has dependencies' );
        await Tasks.createFieldAsync( 'Has Dependencies', FieldType.NUMBER, { precision: 0 } );
        TasksUpdate = true;
    }

    const TaskHasPredecessors = Tasks.getFieldByNameIfExists( 'Has Predecessors' );
    if( !TaskHasPredecessors ){
        services.logs.forDisplay( 'creating All Task has predecessors' );
        await Tasks.createFieldAsync( 'Has Predecessors', FieldType.NUMBER, { precision: 0 } );
        TasksUpdate = true;
    }

    const TaskTags = Tasks.getFieldByNameIfExists( 'Tags.' );
    if( !TaskTags ){
        services.logs.forDisplay( 'creating All Task tags.' );
        await Tasks.createFieldAsync( 'Tags.', FieldType.MULTIPLE_RECORD_LINKS, {
            linkedTableId: Tags.id,
        } );
        TasksUpdate = true;
    }

    const TaskTimeIsLogged = Tasks.getFieldByNameIfExists( 'Time Is Logged' );
    if( !TaskTimeIsLogged ){
        services.logs.forDisplay( 'creating All Task time is logged' );
        await Tasks.createFieldAsync( 'Time Is Logged', FieldType.SINGLE_LINE_TEXT );
        TasksUpdate = true;
    }

    const TaskResponsibilityFirst = Tasks.getFieldByNameIfExists( 'Responsible Firstname' );
    if( !TaskResponsibilityFirst ){
        services.logs.forDisplay( 'creating All Task responsible firstname' );
        await Tasks.createFieldAsync( 'Responsible Firstname', FieldType.SINGLE_LINE_TEXT );
        TasksUpdate = true;
    }

    const TaskResponsibilityLast = Tasks.getFieldByNameIfExists( 'Responsible Lastname' );
    if( !TaskResponsibilityLast ){
        services.logs.forDisplay( 'creating All Task responsible lastname' );
        await Tasks.createFieldAsync( 'Responsible Lastname', FieldType.SINGLE_LINE_TEXT );
        TasksUpdate = true;
    }

    if( TasksUpdate ){
        const allTasks = await services.fetch.task.all();
        await services.sync.addOrUpdate( Tasks, allTasks[ 'todo-items' ] );
    }
}