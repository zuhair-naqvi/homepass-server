import {expect} from 'chai';
import Api from '../app/Api';

var apiObj = new Api();

describe('Accept city and country with API key', () => {

    it('should validate API key', () => {
        expect(apiObj.authenticate('ABC')).to.be.true;
        expect(apiObj.user.name).to.equal('zuhair');
    });

    it('should rate limit requests', () => {
        apiObj.requests = [
            {
                key: "ABC",
                city: "Stockholm",
                country: "Sweden",
                timestamp: "2015-09-30T11:19:03.710Z"
            },
            {
                key: "ABC",
                city: "Amsterdam",
                country: "Netherlands",
                timestamp: "2015-09-30T11:19:26.663Z"
            },
            {
                key: "ABC",
                city: "Berlin",
                country: "Germany",
                timestamp: "2015-09-30T11:19:38.371Z"
            },
            {
                key: "ABC",
                city: "Sydney",
                country: "Australia",
                timestamp: "2015-09-30T11:44:18.458Z"
            },
            {
                key: "ABC",
                city: "Melbourne",
                country: "Australia",
                timestamp: "2015-09-30T11:44:30.341Z"
            },
            {
                key: "ABC",
                city: "Helsinki",
                country: "Finland",
                timestamp: "2015-09-30T11:45:11.203Z"
            }
        ];
        expect(apiObj.passRateLimit('ABC')).to.be.true;
    });    

    it('response should contain the property "description"', (done) => {        
        apiObj.handleRequest('Melbourne', 'Australia')
            .then((response)=>{
                apiObj.httpResponse = response;
            })
            .catch((error)=>{
                apiObj.httpError = error;
            });
        setTimeout( function() {
            expect( apiObj.httpError ).to.be.false;
            expect( apiObj.httpResponse ).to.have.deep.property('data.weather[0].description');
            done();
        }, 1500 );
    });    

});