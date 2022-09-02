import { base } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( tableName ) => {
    let structure;
    if ( tableName === 'Companies' ) structure = await config.table.structure.companies();
    if ( tableName === 'People' ) structure = await config.table.structure.people();
    if ( tableName === 'Projects' ) structure = await config.table.structure.projects();
    if ( tableName === 'Milestones' ) structure = await config.table.structure.milestones();
    if ( tableName === 'Task Lists' ) structure = await config.table.structure.tasklists();
    if ( tableName === 'All Tasks' ) structure = await config.table.structure.alltask();
    if ( tableName === 'Time' ) structure = await config.table.structure.time();
    
    let table = base.getTableByNameIfExists( tableName );
    if( !table ) {
        services.logs.forDisplay( `creating table ${ tableName }.` );
        await base.createTableAsync( tableName, structure );
        table = base.getTableByNameIfExists( tableName );
        services.logs.forDisplay( `table ${ tableName } created.` )
    }
    return table;
}