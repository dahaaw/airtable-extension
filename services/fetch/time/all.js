import { globalConfig } from "@airtable/blocks";
import config from "../../../config";

export default async () => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/time_entries.json`, {
        headers: config.fetch.teamworkHeaders
    });
    return await response.json();
};
