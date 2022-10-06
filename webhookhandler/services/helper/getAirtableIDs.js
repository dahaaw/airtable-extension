const services = require( '../' );

module.exports = async ( table, datas ) => {
    let multipleID = ``;
    for( const data of datas ){
        multipleID += `ID%3D${ data.id }%2C`;
    }
    multipleID = multipleID.slice( 0, -3 );

    const condition = `OR%28${ multipleID }%29`;

    const airtableData = await services.fetch.get( `${ table }?filterByFormula=${ condition }` );
    let IDs = [];
    if( airtableData?.records?.length ){
        for( const record of airtableData.records ){
            IDs.push( record.id );
        }
    }
    return IDs;
}