'use strict';

var exports = module.exports = {};

function getDateOfISOWeek(week, dayInWeek, year) {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    var weekStart = simple;
    if (dow <= 4) {
        weekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
        weekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    weekStart.setDate(simple.getDate() + dayInWeek - 1);
    return weekStart;
}

// returns a start date and a number of days for an Amazon Date as defined in
// https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#date
exports.parseDate = function(str) {
    // Utterances that map to a specific date (such as “today”, or
    // “november twenty-fifth”) convert to a complete date:
    // 2015-11-25. Note that this defaults to dates on or after the
    // current date (see below for more examples).
    if (str.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
        return [ new Date(str), 1 ];
    }

    // Utterances that map to the weekend for a specific week (such as
    // “this weekend”) convert to a date indicating the week number
    // and weekend: 2015-W49-WE.
    if (str.match(/^[0-9]{4}-W[0-9]{2}-WE/)) {
        const re = /([0-9]+)-W([0-9]+)-WE/;
        const result = re.exec(str);
        return [ getDateOfISOWeek(result[2], 6, result[1]), 2 ];
    }

    // Utterances that map to just a specific week (such as “this
    // week” or “next week”), convert a date indicating the week
    // number: 2015-W49.
    if (str.match(/^[0-9]{4}-W[0-9]{2}/)) {
        const re = /([0-9]+)-W([0-9]+)/;
        const result = re.exec(str);
        return [ getDateOfISOWeek(result[2], 1, result[1]), 7 ];
    }

    // Utterances that map to a month, but not a specific day (such as
    // “next month”, or “december”) convert to a date with just the
    // year and month: 2015-12.
    if (str.match(/^[0-9]{4}-[0-9]{2}/)) {
        const startOfMonth = new Date(str + '-01');
        const startOfNextMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 1);
        const daysInMonth = Math.round((startOfNextMonth - startOfMonth) / (1000 * 60 * 60 * 24));
        return [ startOfMonth, daysInMonth ];
    }
    
    // TODO not relevant here

    // Utterances that map to a year (such as “next year”) convert to a
    // date containing just the year: 2016.
    
    // Utterances that map to a decade convert to a date indicating the
    // decade: 201X.
    
    // Utterances that map to a season (such as “next winter”) convert to
    // a date with the year and a season indicator: winter: WI, spring:
    // SP, summer: SU, fall: FA)

    // The utterance “now” resolves to the indicator PRESENT_REF rather
    // than a specific date or time.
}
