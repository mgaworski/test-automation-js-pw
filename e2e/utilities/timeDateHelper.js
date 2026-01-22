function getDateYYYYMMDD(days = 0) {
    /*
    Returns string in the format YYYY-DD-MM with date different by the number of days passed
    as parameter. Default is 0, current date.
    */
    return new Date(new Date().setDate(new Date().getDate() + days)).toISOString().substring(0,10);;
}

module.exports = { getDateYYYYMMDD };