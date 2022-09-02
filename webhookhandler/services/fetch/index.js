const fetch = require( 'node-fetch' );

exports.patch = ( type, data ) => {
    fetch( `https://api.airtable.com/v0/${ process.env.AIRTABLE_BASE_ID }/${ type }`, {
        method: 'patch',
        headers: {
            'Authorization': `Bearer ${ process.env.AIRTABLE_TOKEN }`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    } )
    .then( d => d.json() )
    .then( d => {
        if( d.error?.message ) return console.log( d.error.message );
    })
    .catch( d => console.log(e) )
}

exports.get = async ( url ) => {
    const data = await fetch( `https://api.airtable.com/v0/${ process.env.AIRTABLE_BASE_ID }/${ url }`, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${ process.env.AIRTABLE_TOKEN }`,
            'Content-Type': 'application/json'
        }
    } )
    return await data.json();
}