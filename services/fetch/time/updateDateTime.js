import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( id, date, time ) => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/time_entries/${ id }.json`, {
        method: 'put',
        headers: config.fetch.teamworkHeaders(),
        body: JSON.stringify( { 'time-entry': { date, time } } )
    });
    services.logs.forDisplay( `Time date updated.` );
    return await response.json();
};
