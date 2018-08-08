'use strict';

var expect = require('chai').expect;
var index = require('../index');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe('Testing a session with the TeamOrangeIntent', () => {
    var speechResponse = null
    var speechError = null
    
    before(function(done) {
        index.handler( {
            "session": {
                "sessionId": "SessionId.e16d89f1-2184-40a9-a635-c20bbcb31de8",
                "application": {
                    "applicationId": "amzn1.ask.skill.8a24af94-80a6-4bad-af1f-5dd8f4b066e7"
                },
                "attributes": {},
                "user": {
                    "userId": "amzn1.ask.account.[unique-value-here]"
                },
                "new": true
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "amzn1.echo-api.request.[unique-value-here]",
                "locale": "de-DE",
                "timestamp": "2017-04-01T09:15:03Z",
                "intent": {
                    "name": "GarbageCollectionTypeIntent",
                    "slots": {
                        "City": {
                            "name": "City",
                            "value": "Eisingen"
                        },
                        "Date": {
                            "name": "Date",
                            "value": "2017-W14"
                        }
                    }
                }
            },
            "version": "1.0"
        }, ctx)
        
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    
    describe('The response', () => {
        it('should not have errored', () => {
            expect(speechError).to.be.null
        })
        
        it('should have a version', () => {
            expect(speechResponse.version).to.exist
        })
        
        it('should have a speechlet response', () => {
            expect(speechResponse.response).to.exist
        })

        it('should have a spoken response', () => {
            expect(speechResponse.response.outputSpeech).to.exist
        })

        it('should have a card response', () => {
            expect(speechResponse.response.card).to.exist
        })

        /*
        it('should have session attributes', () => {
            expect(speechResponse.response.sessionAttributes).to.exist
        })
        */
        
        it('should end the alexa session', () => {
            expect(speechResponse.response.shouldEndSession).to.be.true
        })
    })
})
