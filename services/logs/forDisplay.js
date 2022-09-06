import { globalConfig } from "@airtable/blocks";

export default ( logText ) => {
    let exist = globalConfig.get( 'logs' );
    if( !exist ) exist = [];

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    exist.unshift( `${ withZero( hour ) }:${ withZero( minute ) } ${ logText }` );

    if( exist.length > 30 ) exist = exist.slice( 0, 30 );

    globalConfig.setAsync( 'logs', exist );
}

const withZero = ( num ) => (`0${ num }`).slice( -2 );