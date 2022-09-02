import services from "..";
import getIDsFromRelated from "../airtable/record/getIDsFromRelated";

export default async ( table, column, key, value, id ) => {
    console.log( { table, column, key, value, id } );

    if( table === 'Projects' ){
        if( column === 'project' ) await services.fetch.project.update( id, 'name', value );
        if( column === 'date' ) await services.fetch.project.update( id, 'startDate', valueDate( value ) );
        if( column === 'due date' ) await services.fetch.project.update( id, 'endDate', valueDate( value ) );
    }

    if( table === 'Milestones' ){
        if( column === 'Milestone' ) await services.fetch.milestones.update( id, 'title', value );
        if( column === 'Due Date' ) await services.fetch.milestones.update( id, 'deadline', valueDate( value ) );
    }

    if( table === 'All Tasks' ){
        if( column === 'task name' ) await services.fetch.task.update( id, 'content', value );
        if( column === 'start date' ) await services.fetch.task.update( id, 'start-date', valueDate( value ) );
        if( column === 'due date' ) await services.fetch.task.update( id, 'due-date', valueDate( value ) );
        if( column === 'time estimate' ) await services.fetch.task.update( id, 'estimated-minutes', value );
        if( column === 'assigned to' ) {
            const IDs = await getIDsFromRelated( 'People', 'ID', value );
            await services.fetch.task.update( id, 'responsible-party-id', IDs )
        }
    }

    if( table === 'Time' ){
        if( column === 'Is it Billable' ) await services.fetch.time.update( id, 'isbillable', value ? '1' : "0" );
    }
}

const valueDate = ( value ) => {
    if( !value ) return "";
    return value.replace( /-/g, '' );
}