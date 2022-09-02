module.exports = ( id, time ) => {
    const  fields = {};
    if( time.hours ) fields.Hours = time.hours;
    if( time.minutes ) fields.Minutes = time.minutes;
    if( time.minutes ) fields[ 'Decimal Hours' ] = time.hours + ( time.minutes / 60 );
    if( time.date ) fields.Date = time.date;
    if( time.dateUserPerspective ) fields[ 'Date/Time' ] = time.dateUserPerspective;
    if( time.description ) fields.Description = time.description;
    if( time.billable !== undefined ) fields[ 'Is it Billable' ] = time.billable;

    const records = {
        records: [
            { id, fields }
        ]
    }

    return records;
}