import { useLoadable, useWatchable } from "@airtable/blocks/ui";
import { useState } from "react";
import services from "..";

let updatingProcess;
export default ( base ) => {
    const [ updatingDetail, setUpdatingDetail ] = useState( null );
    const query = base.tables.map( table => table.selectRecords() );

    useLoadable( query );
    useWatchable( query, 'cellValues', async (model, key, details) => {

        if( JSON.stringify( updatingDetail ) === JSON.stringify( details ) ) clearTimeout( updatingProcess );

        setUpdatingDetail( details );
        updatingProcess = setTimeout( async() => {
            console.log( {model, key, details } )
            const updatedTable = base.getTableByIdIfExists( model._baseData.activeTableId );

            // const records
            const records = updatedTable.selectRecords();
            for (const recordId of details.recordIds) {
                const updatedRecord = records.getRecordByIdIfExists( recordId );
                console.log({updatedRecord})
                for (const fieldId of details.fieldIds) {
                    const updatedfield = updatedTable.getFieldByIdIfExists( fieldId );
                    const value = updatedRecord?.getCellValue( fieldId );

                    if( !updatedRecord ) return;
                    // get ID
                    let id = updatedRecord.getCellValue( 'ID' );

                    await services.watch.updateTeamwork( updatedTable.name, updatedfield.name, updatedRecord.name, value, id );
                }
            }
        }, 2000);
    });
}