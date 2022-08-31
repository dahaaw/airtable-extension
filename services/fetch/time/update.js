import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( id, key, value ) => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/time_entries/${ id }.json`, {
        method: 'put',
        headers: config.fetch.teamworkHeaders,
        body: JSON.stringify( { 'time-entry': { [key]: value } } )
    });
    services.logs.forDisplay( `Time ${ key } updated.` );
    return await response.json();
};
