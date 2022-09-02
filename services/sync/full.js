import { globalConfig } from "@airtable/blocks";
import services from "..";

export default async ( ) => {
    globalConfig.setAsync( 'isLoading', true );
    let tableCompanies = await services.airtable.table.selectAndCreateIfNotExist( 'Companies' );
    let tablePeople = await services.airtable.table.selectAndCreateIfNotExist( 'People' );
    let tableProjects = await services.airtable.table.selectAndCreateIfNotExist( 'Projects' );
    let tableMilestones = await services.airtable.table.selectAndCreateIfNotExist( 'Milestones' );
    let tableTaskLists = await services.airtable.table.selectAndCreateIfNotExist( 'Task Lists' );
    let tableAllTasks = await services.airtable.table.selectAndCreateIfNotExist( 'All Tasks' );
    let tableTime = await services.airtable.table.selectAndCreateIfNotExist( 'Time' );

    // GET DATA COMPANIES AND ADD RECORD
    const allCompanies = await services.fetch.companies.all();
    await services.sync.addRecords( tableCompanies, allCompanies[ 'companies' ] );
        
    // GET DATA PEOPLE AND ADD RECORD
    const allPeople = await services.fetch.people.all();
    await services.sync.addRecords( tablePeople, allPeople[ 'people' ] );

    // GET DATA PROJECTS AND ADD RECORD
    const allProjects = await services.fetch.project.all();
    await services.sync.addRecords( tableProjects, allProjects.projects );

    // GET DATA MILESTONES AND ADD RECORD
    const allMilestones = await services.fetch.milestones.all();
    await services.sync.addRecords( tableMilestones, allMilestones[ 'milestones' ] );

    // GET DATA TASKS LISTS AND ADD RECORD
    const taskLists = await services.fetch.taskList.all();
    await services.sync.addRecords( tableTaskLists, taskLists[ 'tasklists' ] );

    // GET DATA TASKS AND ADD RECORD
    const allTasks = await services.fetch.task.all();
    await services.sync.addRecords( tableAllTasks, allTasks[ 'todo-items' ] );

    // GET DATA TIME AND ADD RECORD
    const allTimes = await services.fetch.time.all();
    await services.sync.addRecords( tableTime, allTimes[ 'time-entries' ] );

    services.logs.forDisplay( 'synced.' );
    globalConfig.setAsync( 'isLoading', false );
}