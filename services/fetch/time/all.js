import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( lastSyncDate, page = 1, data = null ) => {
    let url = `${ globalConfig.get( 'teamworkUrl' ) }/time_entries.json?page=${ page }`;
    if( lastSyncDate ) url += `&updatedAfterDate=${ lastSyncDate }`
    const response = await fetch( url, {
        headers: config.fetch.teamworkHeaders()
    });
    const dataResponse = await response.json();
    
    // if last fetch contain data, merge and request next page
    if( data ) data[ 'time-entries' ] = [...data[ 'time-entries' ], ...dataResponse[ 'time-entries' ] ];

    // if first page set data is data response
    if( !data ) data = dataResponse;

    // if last fetch no data, return last data
    if( !dataResponse?.[ 'time-entries' ]?.length ) return data;

    return await services.fetch.time.all( lastSyncDate, page + 1, data );
};