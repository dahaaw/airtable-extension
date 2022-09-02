import { globalConfig } from "@airtable/blocks";
import config from "../../../config";

export default async () => {
    const response = await fetch(`${ globalConfig.get( 'teamworkUrl' ) }/tasks.json?includeCompletedTasks=true&includeTasksWithoutDueDates=true&includeArchivedProjects=true&includeCompletedPredecessors=true`, {
        headers: config.fetch.teamworkHeaders()
    });
    return await response.json();
};
