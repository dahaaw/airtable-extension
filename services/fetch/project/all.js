import { globalConfig } from "@airtable/blocks";
import config from "../../../config";

export default async ( lastSyncDate ) => {
    let url = `${ globalConfig.get( 'teamworkUrl' ) }/projects.json?includePeople=true&includeProjectOwner=true`;
    if( lastSyncDate ) url += `&updatedAfterDate=${ lastSyncDate }`
    const response = await fetch( url, {
        headers: config.fetch.teamworkHeaders()
    });
    return await response.json();
};
