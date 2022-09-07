export default async ( table, fieldWhere, valueWhere, fieldWant ) => {
    const query = table.selectRecords();
    for( const record of query.records ){
        if( record.getCellValue( fieldWhere ) === valueWhere ) return record.getCellValue( fieldWant );
    }
}