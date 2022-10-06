import { base } from "@airtable/blocks"
import { FieldType } from "@airtable/blocks/models";
import services from "..";

export default async () => {
    // TAGS UPDATE
    let Tags = base.getTableByNameIfExists( 'Tags' );
    if( !Tags ){
        Tags = await services.airtable.table.selectAndCreateIfNotExist( 'Tags' );
        const allTags = await services.fetch.tags.all();
        await services.sync.addRecords( Tags, allTags.tags );

        // create field tags on table Project
        let Projects = base.getTableByNameIfExists( 'Projects' );
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
}