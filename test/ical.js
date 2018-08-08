'use strict';

const expect = require('chai').expect;
const ical = require('ical');

describe('ical helpers', function() {
    describe('Eisingen', function() {
        const data = ical.parseFile('test/eisingen_2017.ics');

        for (var k in data) {
            const evt = data[k];
            //console.log(evt);
            it('should have all fields for ' + evt.uid, function() {
                expect(evt.location).to.equal('Eisingen');
                expect(evt.status).to.equal('CONFIRMED');
                expect(evt.description).to.be.a('string');
                expect(evt.summary).to.be.a('string');
                expect(evt.start).to.be.a('Date');
            });
        }
    });
});
