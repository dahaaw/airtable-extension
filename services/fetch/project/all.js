import { globalConfig } from "@airtable/blocks";
import config from "../../../config";

export default async () => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/projects.json?includePeople=true&includeProjectOwner=true`, {
        headers: config.fetch.teamworkHeaders
    });
    return await response.json();
};
