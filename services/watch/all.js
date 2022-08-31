import { useLoadable, useWatchable } from "@airtable/blocks/ui";
import services from "..";

export default ( base ) => {
    const query = base.tables.map( table => table.selectRecords() );

    useLoadable( query );
    useWatchable( query, 'cellValues', async (model, key, details) => {
        console.log( {model, key, details } )
        const updatedTable = base.getTableByIdIfExists( model._baseData.activeTableId );
        console.log( updatedTable.name );

        // const records
        const records = updatedTable.selectRecords();
        for (const recordId of details.recordIds) {
            const updatedRecord = records.getRecordByIdIfExists( recordId );

            for (const fieldId of details.fieldIds) {
                const updatedfield = updatedTable.getFieldByIdIfExists( fieldId );
                const value = updatedRecord.getCellValue( fieldId );

                // get ID
                let id = updatedRecord.getCellValue( 'ID' );

                await services.watch.updateTeamwork( updatedTable.name, updatedfield.name, updatedRecord.name, value, id );
            }
        }
    });
}