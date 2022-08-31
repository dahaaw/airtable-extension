import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( id, key, value ) => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/tasks/${ id }.json`, {
        method: 'put',
        headers: config.fetch.teamworkHeaders,
        body: JSON.stringify( { 'todo-item': { [key]: value } } )
    });
    services.logs.forDisplay( `Task ${ key } updated.` );
    return await response.json();
};
