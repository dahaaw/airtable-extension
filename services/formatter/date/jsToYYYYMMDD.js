export default ( date ) => {
    if( !date ) return;
    const fullYear = date.getUTCFullYear().toString();
    const fullMonth = ( "0" + ( date.getUTCMonth() + 1 ).toString() ).slice( -2 );
    const fullDate = ( "0" + ( date.getUTCDate() ).toString() ).slice( -2 );
    const fullHour = ( "0" + date.getUTCHours() ).toString().slice( -2 );
    const fullMinutes = ( "0" + date.getUTCMinutes() ).toString().slice( -2 );
    const fullSeconds = ( "0" + date.getUTCSeconds() ).toString().slice( -2 );
    return fullYear + fullMonth + fullDate + fullHour + fullMinutes + fullSeconds;
}