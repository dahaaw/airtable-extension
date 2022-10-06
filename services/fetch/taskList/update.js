import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( id, key, value ) => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/tasklists/${ id }.json`, {
        method: 'put',
        headers: config.fetch.teamworkHeaders(),
        body: JSON.stringify( { 
            applyDefaultsToExistingTasks: true,
            'todo-list': { [key]: value } 
        } )
    });
    services.logs.forDisplay( `Task list ${ key } updated.` );
    return await response.json();
};
