import { globalConfig } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( taskId, key, projectId, tasklistId ) => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/tasks/${ taskId }/move.json`, {
        method: 'put',
        headers: config.fetch.teamworkHeaders(),
        body: JSON.stringify( { 
            taskId,
            projectId,
            tasklistId
        } )
    });
    services.logs.forDisplay( `Task ${ key } updated.` );
    return await response.json();
};
