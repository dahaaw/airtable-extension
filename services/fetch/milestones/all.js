import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( lastSyncDate, page = 1, data = null ) => {
    let url = `${ globalConfig.get( 'teamworkUrl' ) }/milestones.json?getProgress=true&projectType=ALL&page=${ page }`;
    if( lastSyncDate ) url += `&updatedAfterDate=${ lastSyncDate }`;
    const response = await fetch( url, {
        headers: config.fetch.teamworkHeaders()
    });
    const dataResponse = await response.json();

    // if last fetch contain data, merge and request next page
    if( data ) data.milestones = [...data.milestones, ...dataResponse.milestones ];

    // if first page set data is data response
    if( !data ) data = dataResponse;

    // if last fetch no data, return last data
    if( !dataResponse?.milestones?.length ) return data;

    return await services.fetch.milestones.all( lastSyncDate, page + 1, data );
};
