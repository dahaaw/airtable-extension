import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( id, key, value ) => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/projects/${ id }.json`, {
        method: 'put',
        headers: config.fetch.teamworkHeaders(),
        body: JSON.stringify( { project: { [key]: value } } )
    });
    services.logs.forDisplay( `Project ${ key } updated.` );
    return await response.json();
};
