/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const ical = require('ical');
const icalUtil = require('./ical-util');

const APP_ID = 'amzn1.ask.skill.8a24af94-80a6-4bad-af1f-5dd8f4b066e7';

const languageStrings = {
    "de": {
        "translation": {
            "UNKNOWN_CITY_MESSAGE": "Ich kenne diesen Ort leider nicht.",
            "UNKNOWN_DATE_MESSAGE": "Ich kann diese Zeitangabe leider nicht verstehen.",
            "UNKNOWN_GARBAGE_TYPE_MESSAGE": "Ich kenne diese Art von Müll leider nicht.",
            "HELP_MESSAGE": "Du kannst sagen, „Frag Team Orange was nächste Woche in Eisingen dran ist“, oder du kannst „Beenden“ sagen. Wie kann ich dir helfen?",
            "HELP_REPROMPT": "Wie kann ich dir helfen?",
            "STOP_MESSAGE": "Auf Wiedersehen!",
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'GarbageCollectionTypeIntent': function () {
        const citySlot = this.event.request.intent.slots.City;
        const dateSlot = this.event.request.intent.slots.Date;
        if (!citySlot || !citySlot.value) {
            console.error('no slot value given for city');
            this.emit(':tell', this.t('UNKNOWN_CITY_MESSAGE'));
        }
        if (!dateSlot || !dateSlot.value) {
            console.error('no slot value given for date');
            this.emit(':tell', this.t('UNKNOWN_DATE_MESSAGE'));
        }

        const data = ical.parseFile('allestrasseneisingen.ics');

        const city = citySlot.value.toLowerCase();
        const date = dateSlot.value;
        console.log('searching for garbage collection types in', city, 'at', date);
        var startDate, days;
        [startDate, days] = icalUtil.parseDate(date);
        console.log('searching starting at', startDate, 'for', days, 'days');

        for (var k in data) {
            console.log(data[k].start);
        }
        this.emit(':tellWithCard', 'Irgendein Müll wird irgendwann bestimmt abgeholt.', city, 'cardContent');
    },
    'GarbageCollectionDateIntent': function () {
        const garbageTypeSlot = this.event.request.intent.slots.GarbageType;
        const citySlot = this.event.request.intent.slots.City;
        if (!garbageTypeSlot || !garbageTypeSlot.value) {
            console.error('no slot value given for garbage type');
            this.emit(':tell', this.t('UNKNOWN_GARBAGE_TYPE_MESSAGE'));
        }
        if (!citySlot || !citySlot.value) {
            console.error('no slot value given for city');
            this.emit(':tell', this.t('UNKNOWN_CITY_MESSAGE'));
        }

        const garbageType = garbageTypeSlot.value;
        const city = citySlot.value;
        console.log('searching for garbage collection dates of', garbageType, 'in', city);

        const cardTitle = garbageType + ' in ' + city;
        this.emit(':tellWithCard', 'Das kann ich noch nicht.', cardTitle, 'cardContent');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
