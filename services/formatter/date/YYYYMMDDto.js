export default ( date ) => {
    if( !date ) return;

    return new Date( date.slice( 0, 4), date.slice( 4, 6 ), date.slice( 6, 8 ) )
}