import { useLoadable, useWatchable } from "@airtable/blocks/ui";
import { useState } from "react";
import services from "..";

export default ( base ) => {
    const query = base.tables.map( table => table.selectRecords() );
    const [ updatingDetail, setUpdatingDetail ] = useState( null );

    useLoadable( query );
    useWatchable( query, 'cellValues', services.watch.func( updatingDetail, setUpdatingDetail ));
}