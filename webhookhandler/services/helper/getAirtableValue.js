const services = require( '../' );

module.exports = async ( table, ID ) => {
    const airtableData = await services.fetch.get( `${ table }?filterByFormula=ID%3D${ ID }` );
    return airtableData?.records?.[0];
}