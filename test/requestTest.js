import {expect} from 'chai';
import Api from '../Api';

var apiObj = new Api();

describe('Accept city and country with API key', () => {
    it('should validate API key', () => {
        apiObj.setApiKey('XYZ');
        expect(apiObj.authenticate()).to.be.true;
        expect(apiObj.user.name).to.equal('zuhair');
    });
    it('should make authenticated request', (done) => {        
        apiObj.handleRequest('Melbourne', 'Australia')
            .then((response)=>{
                apiObj.httpResponse = response;
            })
            .catch((response)=>{
                apiObj.httpError = response;
            });
        setTimeout( function() {
            expect( apiObj.httpError ).to.be.false;
            expect( apiObj.httpResponse ).to.have.deep.property('data.weather[0].description');
            done();
        }, 1500 );
    });    
});