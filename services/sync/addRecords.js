import { globalConfig } from "@airtable/blocks";
import services from "..";

export default async ( table, teamworkData ) => {
    const batchSize = globalConfig.get( 'batchSize' );

    let loopIndex = 0;
    while ( loopIndex < teamworkData.length){
        const slicedData = teamworkData.slice( loopIndex, loopIndex + batchSize );
        // await write data
        services.logs.forDisplay( `insert ${ slicedData.length } data to ${ table.name }` );
        await table.createRecordsAsync( services.sync.formatData( table.name, slicedData ) );

        loopIndex += batchSize;
    }
}