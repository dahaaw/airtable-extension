import { globalConfig } from "@airtable/blocks";
import config from "../../../config";

export default async ( lastSyncDate ) => {
    let url = `${ globalConfig.get( 'teamworkUrl' ) }/time_entries.json`;
    if( lastSyncDate ) url += `?updatedAfterDate=${ lastSyncDate }`
    const response = await fetch( url, {
        headers: config.fetch.teamworkHeaders()
    });
    return await response.json();
};