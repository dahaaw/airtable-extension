import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( id, key, value ) => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/milestones/${ id }.json`, {
        method: 'put',
        headers: config.fetch.teamworkHeaders(),
        body: JSON.stringify( { milestone: { [key]: value } } )
    });
    services.logs.forDisplay( `Milestone ${ key } updated.` );
    return await response.json();
};
