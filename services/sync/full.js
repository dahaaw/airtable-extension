import { globalConfig } from "@airtable/blocks";
import services from "..";

export default async () => {
    globalConfig.setAsync( 'isLoading', true );
    let tableProjects = await services.airtable.table.selectAndCreateIfNotExist( 'Projects' );
    let tableAllTasks = await services.airtable.table.selectAndCreateIfNotExist( 'All Tasks' );
    let tableTime = await services.airtable.table.selectAndCreateIfNotExist( 'Time' );
    let tableMilestones = await services.airtable.table.selectAndCreateIfNotExist( 'Milestones' );
    let tablePeople = await services.airtable.table.selectAndCreateIfNotExist( 'People' );
    let tableCompanies = await services.airtable.table.selectAndCreateIfNotExist( 'Companies' );

    // GET DATA PROJECTS AND ADD RECORD
    const allProjects = await services.fetch.project.all();
    await services.sync.addRecords( tableProjects, allProjects.projects );

    // GET DATA TASKS AND ADD RECORD
    const allTasks = await services.fetch.task.all();
    await services.sync.addRecords( tableAllTasks, allTasks[ 'todo-items' ] );

    // GET DATA TIME AND ADD RECORD
    const allTimes = await services.fetch.time.all();
    await services.sync.addRecords( tableTime, allTimes[ 'time-entries' ] );

    // GET DATA MILESTONES AND ADD RECORD
    const allMilestones = await services.fetch.milestones.all();
    await services.sync.addRecords( tableMilestones, allMilestones[ 'milestones' ] );

    // GET DATA PEOPLE AND ADD RECORD
    const allPeople = await services.fetch.people.all();
    await services.sync.addRecords( tablePeople, allPeople[ 'people' ] );

    // GET DATA COMPANIES AND ADD RECORD
    const allCompanies = await services.fetch.companies.all();
    await services.sync.addRecords( tableCompanies, allCompanies[ 'companies' ] );


    services.logs.forDisplay( 'synced.' );
    globalConfig.setAsync( 'isLoading', false );
}