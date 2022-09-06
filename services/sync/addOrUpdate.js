import services from "..";

export default async ( table, teamworkData ) => {
    for( const td of teamworkData ){
        let id = services.airtable.record.getIDs( table.name, 'ID', td.id.toString() );
        if( id.length ){
            const recordID = id[ 0 ].id;
            const records = await table.selectRecordsAsync();
            const record = records.getRecordById( recordID );
            
            records.unwatch( 'cellValues', (model, key, args) => console.log({ status:'unwatch', model, key, args}))
            // update
            services.logs.forDisplay( `update 1 data to ${ table.name }` );
            const dataToUpdate = services.sync.formatData( table.name, [ td ] );
            dataToUpdate[ 0 ].id = recordID;
            await table.updateRecordsAsync( dataToUpdate );
            console.log({ record, dataToUpdate })

            records.watch( 'cellValues', services.watch.func() )
        } else {
            // add
            await services.sync.addRecords( table, [ td ] );
        }
    }
}