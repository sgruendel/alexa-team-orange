'use strict';

const chai = require('chai');
chai.use(require('chai-datetime'));
const expect = chai.expect;
const icalUtil = require('../ical-util');

describe('ical util', function() {
    describe('#parseDate()', function() {

        it('should parse specific date', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-04-06');
            expect(startDate).to.equalDate(new Date('2017-04-06'));
            expect(days).to.equal(1);
        });

        it('should parse specific week', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-W14');
            expect(startDate).to.equalDate(new Date('2017-04-03'));
            expect(days).to.equal(7);
        });

        it('should parse specific weekend', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-W14-WE');
            expect(startDate).to.equalDate(new Date('2017-04-08'));
            expect(days).to.equal(2);
        });

        // specific months
        it('should parse January', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-01');
            expect(startDate).to.equalDate(new Date('2017-01-01'));
            expect(days).to.equal(31);
        });

        it('should parse February', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-02');
            expect(startDate).to.equalDate(new Date('2017-02-01'));
            expect(days).to.equal(28);
        });

        it('should parse March', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-03');
            expect(startDate).to.equalDate(new Date('2017-03-01'));
            expect(days).to.equal(31);
        });

        it('should parse April', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-04');
            expect(startDate).to.equalDate(new Date('2017-04-01'));
            expect(days).to.equal(30);
        });

        it('should parse May', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-05');
            expect(startDate).to.equalDate(new Date('2017-05-01'));
            expect(days).to.equal(31);
        });

        it('should parse June', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-06');
            expect(startDate).to.equalDate(new Date('2017-06-01'));
            expect(days).to.equal(30);
        });

        it('should parse July', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-07');
            expect(startDate).to.equalDate(new Date('2017-07-01'));
            expect(days).to.equal(31);
        });

        it('should parse August', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-08');
            expect(startDate).to.equalDate(new Date('2017-08-01'));
            expect(days).to.equal(31);
        });

        it('should parse September', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-09');
            expect(startDate).to.equalDate(new Date('2017-09-01'));
            expect(days).to.equal(30);
        });

        it('should parse October', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-10');
            expect(startDate).to.equalDate(new Date('2017-10-01'));
            expect(days).to.equal(31);
        });

        it('should parse November', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-11');
            expect(startDate).to.equalDate(new Date('2017-11-01'));
            expect(days).to.equal(30);
        });

        it('should parse December', function() {
            var startDate, days;
            [startDate, days] = icalUtil.parseDate('2017-12');
            expect(startDate).to.equalDate(new Date('2017-12-01'));
            expect(days).to.equal(31);
        });

    });
});
