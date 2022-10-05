import services from "..";

export default ( tableName, teamworkData ) => {
    let formatter;
    if( tableName === 'Projects' ) formatter = services.sync.formatDataProjects;
    if( tableName === 'All Tasks' ) formatter = services.sync.formatDataAllTasks;
    if( tableName === 'Time' ) formatter = services.sync.formatDataTimes;
    if( tableName === 'Milestones' ) formatter = services.sync.formatDataMilestones;
    if( tableName === 'People' ) formatter = services.sync.formatDataPeople;
    if( tableName === 'Companies' ) formatter = services.sync.formatDataCompanies;
    if( tableName === 'Task Lists' ) formatter = services.sync.formatDataTaskLists;
    if( tableName === 'Tags' ) formatter = services.sync.formatDataTags;

    return formatter( teamworkData );
}