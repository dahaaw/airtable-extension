import { base } from "@airtable/blocks";

export default ( tableName, field, values ) => {
    const table = base.getTableByNameIfExists( tableName );
    const query = table.selectRecords();
    let ids = '';
    if( values?.length ) for (const v of values ){
        const record = query.getRecordById( v.id );
        ids += record.getCellValue( field ) + ',';
    }

    ids = ids.slice( 0, -1 );
    return ids;
}