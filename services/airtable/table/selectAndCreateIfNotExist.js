import { base } from "@airtable/blocks";
import services from "../..";
import config from "../../../config";

export default async ( tableName ) => {
    let structure;
    if ( tableName === 'Projects' ) structure = config.table.structure.projects;
    if ( tableName === 'All Tasks' ) structure = config.table.structure.alltask;
    if ( tableName === 'Time' ) structure = config.table.structure.time;
    if ( tableName === 'Milestones' ) structure = config.table.structure.milestones;
    if ( tableName === 'People' ) structure = config.table.structure.people;
    if ( tableName === 'Companies' ) structure = config.table.structure.companies;

    let table = base.getTableByNameIfExists( tableName );
    if( !table ) {
        services.logs.forDisplay( `creating table ${ tableName }.` );
        await base.createTableAsync( tableName, structure );
        table = base.getTableByNameIfExists( tableName );
        services.logs.forDisplay( `table ${ tableName } created.` )
    }
    return table;
}