import { globalConfig } from "@airtable/blocks";
import services from "..";
import config from "../../config";

export default () => {
    fetch(`${ globalConfig.get( 'teamworkUrl' ) }/projects.json`, {
        headers: config.fetch.teamworkHeaders()
    })
    .then( () => {
        globalConfig.setAsync( 'connected', true );
        services.logs.forDisplay( 'Connected to Teamwork' );
    })
    .catch( () => {
        globalConfig.setAsync( 'connected', false );
        services.logs.forDisplay( 'Fail while connecting to Teamwork, please check settings' );
    })
};