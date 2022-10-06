const services = require( '../' );

module.exports = async ( table, ID ) => {
    const airtableData = await services.fetch.get( `${ table }?filterByFormula=ID%3D${ ID }` );
    const id = airtableData?.records?.[0]?.id;
    return id;
}