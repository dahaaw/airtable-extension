import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( lastSyncDate, page = 1, data = null ) => {
    let url = `${ globalConfig.get( 'teamworkUrl' ) }/tasks.json?page=${ page }&pageSize=10&includeCompletedTasks=true&includeTasksWithoutDueDates=true&includeArchivedProjects=true&includeCompletedPredecessors=true`;
    if( lastSyncDate ) url += `&updatedAfterDate=${ lastSyncDate }`;
    const response = await fetch( url, {
        headers: config.fetch.teamworkHeaders()
    });
    const dataResponse = await response.json();

    // if last fetch contain data, merge and request next page
    if( data ) data[ 'todo-items' ] = [...data[ 'todo-items' ], ...dataResponse[ 'todo-items' ] ];

    // if first page set data is data response
    if( !data ) data = dataResponse;

    // if last fetch no data, return last data
    if( !dataResponse?.[ 'todo-items' ]?.length ) return data;

    return await services.fetch.task.all( lastSyncDate, page + 1, data );
};
