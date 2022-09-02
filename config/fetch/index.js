import { globalConfig } from "@airtable/blocks"

const teamworkHeaders = () => {
    const combine = globalConfig.get( 'username' ) + ':' + globalConfig.get( 'password' );
    return { Authorization: `Basic ${ btoa( combine ) }` }
}

export default {
    teamworkHeaders
}