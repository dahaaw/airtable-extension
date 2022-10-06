import { base } from "@airtable/blocks";
import services from "..";
import getIDsFromRelated from "../airtable/record/getIDsFromRelated";

export default async ( table, column, key, value, id ) => {
    console.log( { table, column, key, value, id } );

    if( table === 'Projects' ){
        if( column === 'project' ) await services.fetch.project.update( id, 'name', value );
        if( column === 'description' ) await services.fetch.project.update( id, 'description', value );
        if( column === 'date' ) await services.fetch.project.update( id, 'startDate', valueDate( value ) );
        if( column === 'due date' ) await services.fetch.project.update( id, 'endDate', valueDate( value ) );
        if( column === 'project category' ) {
            const projectCategories = await services.fetch.project.categories();
            let projectCategory = projectCategories.categories.find( f => f.name === value.name );
            if ( projectCategory ) await services.fetch.project.update( id, 'category-id', projectCategory.id );
        }
        if( column === 'Tags.' ){
            const IDs = getIDsFromRelated( 'Tags', 'ID', value )
            await services.fetch.project.update( id, 'tagIds', IDs );
        }
        if( column === 'company name' && value ){
            const ID = getIDsFromRelated( 'Companies', 'ID', [ value[ 0 ] ] );
            await services.fetch.project.update( id, 'companyId', ID );
        }
    }

    if( table === 'Milestones' ){
        if( column === 'Milestone' ) await services.fetch.milestones.update( id, 'title', value );
        if( column === 'Description' ) await services.fetch.milestones.update( id, 'description', value );
        if( column === 'Due Date' ) await services.fetch.milestones.update( id, 'deadline', valueDate( value ) );
    }

    if( table === 'Task Lists' ){
        if( column === 'Description' ) await services.fetch.taskList.update( id, 'description', value );
    }

    if( table === 'All Tasks' ){
        if( column === 'task name' ) await services.fetch.task.update( id, 'content', value );
        if( column === 'task description' ) await services.fetch.task.update( id, 'description', value );
        if( column === 'priority text' ) await services.fetch.task.update( id, 'priority', value.name?.toLowerCase() );
        if( column === 'start date' ) await services.fetch.task.update( id, 'start-date', valueDate( value ) );
        if( column === 'due date' ) await services.fetch.task.update( id, 'due-date', valueDate( value ) );
        if( column === 'time estimate' ) await services.fetch.task.update( id, 'estimated-minutes', value );
        if( column === 'assigned to' ) {
            const IDs = await getIDsFromRelated( 'People', 'ID', value );
            await services.fetch.task.update( id, 'responsible-party-id', IDs )
        }
        if( column === 'progress' ) await services.fetch.task.update( id, 'progress', value * 100 )
    }

    if( table === 'Time' ){
        if( column === 'Hours' ){
            const timeTabel = base.getTableByNameIfExists( table );
            const minutes = await services.airtable.record.getValue( timeTabel, 'ID', id, 'Minutes' );
            await services.fetch.time.update( id, 'minutes', ( value * 60 ) + minutes );
        }
        if( column === 'Minutes' ){
            const timeTabel = base.getTableByNameIfExists( table );
            const hours = await services.airtable.record.getValue( timeTabel, 'ID', id, 'Hours' );
            await services.fetch.time.update( id, 'minutes', ( hours * 60 ) + value )
        }
        if( column === 'Date' ){
            const gmt0 = services.formatter.date.localeToGMT( value );
            const splited = gmt0?.split( 'T' );
            const date = valueDate( splited[ 0 ] );
            const time = splited[ 1 ]?.slice( 0, 5 );
            await services.fetch.time.updateDateTime( id, date, time );
        }
        if( column === 'Description' ) await services.fetch.time.update( id, 'description', value );
        if( column === 'Is it Billable' ) await services.fetch.time.update( id, 'isbillable', value ? '1' : "0" );
    }
}

const valueDate = ( value ) => {
    if( !value ) return "";
    return value.replace( /-/g, '' );
}