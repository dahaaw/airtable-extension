export default ( dateTimeValue ) => {
    let date = new Date( dateTimeValue );
    let isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    return isoDateTime;
}