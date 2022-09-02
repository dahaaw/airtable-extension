import { base } from "@airtable/blocks";

export default ( table, field, values ) => {
    if( !values ) return null;
    
    // if values not array, set to array
    if( typeof values != 'object' ) values = [ values ];

    let data = [];
    for ( const value of values ){
        const tableData = base.getTableByNameIfExists( table );
        const query = tableData.selectRecords( {
            field: [ field ]
        } );
        for( const record of query.records ){
            let palue = value;
            if( field === 'ID' ) palue = Number( value )
            if ( record.getCellValue( field ) === palue ) data.push( { id: record.id } )
        }
    }
    return data;
}