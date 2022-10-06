import { globalConfig } from "@airtable/blocks";
import services from "..";

export default async ( auto = false ) => {
    globalConfig.setAsync( 'isLoading', true );
    globalConfig.setAsync( 'autoSync', auto );
    if( !auto ) globalConfig.setAsync( 'fullSyncLoading', true );

    // patch update
    if( lastSync ) await services.updates();

    let table = {};
    table.Companies = await services.airtable.table.selectAndCreateIfNotExist( 'Companies' );
    table.People = await services.airtable.table.selectAndCreateIfNotExist( 'People' );
    table.Tags = await services.airtable.table.selectAndCreateIfNotExist( 'Tags' );
    table.Projects = await services.airtable.table.selectAndCreateIfNotExist( 'Projects' );
    table.Milestones = await services.airtable.table.selectAndCreateIfNotExist( 'Milestones' );
    table.TaskLists = await services.airtable.table.selectAndCreateIfNotExist( 'Task Lists' );
    table.AllTasks = await services.airtable.table.selectAndCreateIfNotExist( 'All Tasks' );
    table.Time = await services.airtable.table.selectAndCreateIfNotExist( 'Time' );

    const lastSync = globalConfig.get( 'lastSync' );
    const autoSync = globalConfig.get( 'autoSync' );

    if( !autoSync ){
        if( lastSync ) {
            await createOrUpdate( table );
        } else {
            await fullCreate( table );
        }
    } else {
        await syncUpdate( table );
    }
    
    if( !auto ) await globalConfig.setAsync( 'fullSyncLoading', false );
    const fullSyncLoading = globalConfig.get( 'fullSyncLoading' );
    if( !fullSyncLoading ) globalConfig.setAsync( 'isLoading', false );
    const lastSyncUTCString = new Date().toUTCString();
    globalConfig.setAsync( 'lastSync', lastSyncUTCString );
    if( !fullSyncLoading ) services.logs.forDisplay( 'synced.' );
    
    if( !fullSyncLoading ) setTimeout(() => {
        services.sync.full( true )
    }, ( Number( globalConfig.get( 'autoSyncInterval' ) ) | 10 ) *  1000);
}

const fullCreate = async ( table ) => {
    // GET DATA COMPANIES AND ADD RECORD
    const allCompanies = await services.fetch.companies.all();
    await services.sync.addRecords( table.Companies, allCompanies[ 'companies' ] );
        
    // GET DATA PEOPLE AND ADD RECORD
    const allPeople = await services.fetch.people.all();
    await services.sync.addRecords( table.People, allPeople[ 'people' ] );

    // GET DATA TAGS AND ADD RECORD
    const allTags = await services.fetch.tags.all();
    await services.sync.addRecords( table.Tags, allTags.tags );

    // GET DATA PROJECTS AND ADD RECORD
    const allProjects = await services.fetch.project.all();
    await services.sync.addRecords( table.Projects, allProjects.projects );

    // GET DATA MILESTONES AND ADD RECORD
    const allMilestones = await services.fetch.milestones.all();
    await services.sync.addRecords( table.Milestones, allMilestones[ 'milestones' ] );

    // GET DATA TASKS LISTS AND ADD RECORD
    const taskLists = await services.fetch.taskList.all();
    await services.sync.addRecords( table.TaskLists, taskLists[ 'tasklists' ] );

    // GET DATA TASKS AND ADD RECORD
    const allTasks = await services.fetch.task.all();
    await services.sync.addRecords( table.AllTasks, allTasks[ 'todo-items' ] );

    // GET DATA TIME AND ADD RECORD
    const allTimes = await services.fetch.time.all();
    await services.sync.addRecords( table.Time, allTimes[ 'time-entries' ] );
}

const createOrUpdate = async ( table ) => {
    // GET DATA COMPANIES AND ADD RECORD
    const allCompanies = await services.fetch.companies.all();
    await services.sync.addOrUpdate( table.Companies, allCompanies[ 'companies' ] );

    // GET DATA PEOPLE AND ADD RECORD
    const allPeople = await services.fetch.people.all();
    await services.sync.addOrUpdate( table.People, allPeople[ 'people' ] );

    // GET DATA TAGS AND ADD RECORD
    const allTags = await services.fetch.tags.all();
    await services.sync.addOrUpdate( table.Tags, allTags.tags );

    // GET DATA PROJECTS AND ADD RECORD
    const allProjects = await services.fetch.project.all();
    await services.sync.addOrUpdate( table.Projects, allProjects.projects );

    // GET DATA MILESTONES AND ADD RECORD
    const allMilestones = await services.fetch.milestones.all();
    await services.sync.addOrUpdate( table.Milestones, allMilestones[ 'milestones' ] );

    // GET DATA TASKS LISTS AND ADD RECORD
    const taskLists = await services.fetch.taskList.all();
    await services.sync.addOrUpdate( table.TaskLists, taskLists[ 'tasklists' ] );

    // GET DATA TASKS AND ADD RECORD
    const allTasks = await services.fetch.task.all();
    await services.sync.addOrUpdate( table.AllTasks, allTasks[ 'todo-items' ] );

    // GET DATA TIME AND ADD RECORD
    const allTimes = await services.fetch.time.all();
    await services.sync.addOrUpdate( table.Time, allTimes[ 'time-entries' ] );
}

const syncUpdate = async ( table ) => {
    const lastSync = globalConfig.get( 'lastSync' );
    let lastSyncDate = lastSync ? new Date( lastSync ) : null;
    
    lastSyncDate = services.formatter.date.jsToYYYYMMDD( lastSyncDate );
    
    // GET DATA COMPANIES AND ADD RECORD
    const allCompanies = await services.fetch.companies.all( lastSyncDate );
    await services.sync.addOrUpdate( table.Companies, allCompanies[ 'companies' ] );

    // GET DATA PEOPLE AND ADD RECORD
    const allPeople = await services.fetch.people.all( lastSyncDate );
    await services.sync.addOrUpdate( table.People, allPeople[ 'people' ] );

    // GET DATA TAGS AND ADD RECORD
    const allTags = await services.fetch.tags.all( lastSyncDate );
    await services.sync.addOrUpdate( table.Tags, allTags.tags );

    // GET DATA PROJECTS AND ADD RECORD
    const allProjects = await services.fetch.project.all( lastSyncDate );
    await services.sync.addOrUpdate( table.Projects, allProjects.projects );

    // GET DATA MILESTONES AND ADD RECORD
    const allMilestones = await services.fetch.milestones.all( lastSyncDate );
    await services.sync.addOrUpdate( table.Milestones, allMilestones[ 'milestones' ] );

    // GET DATA TASKS LISTS AND ADD RECORD
    const taskLists = await services.fetch.taskList.all( lastSyncDate );
    await services.sync.addOrUpdate( table.TaskLists, taskLists[ 'tasklists' ] );

    // GET DATA TASKS AND ADD RECORD
    const allTasks = await services.fetch.task.all( lastSyncDate );
    await services.sync.addOrUpdate( table.AllTasks, allTasks[ 'todo-items' ] );

    // GET DATA TIME AND ADD RECORD
    const allTimes = await services.fetch.time.all( lastSyncDate );
    await services.sync.addOrUpdate( table.Time, allTimes[ 'time-entries' ] );
}