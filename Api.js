import _ from 'lodash';
import axios from 'axios';

// Define App constants
const gateway = 'http://api.openweathermap.org/data/2.5/weather';
const rateLimit = 10;
const requests = [];
const users = [
  { 'name': 'zuhair',  'key': 'XYZ', 'active': true },
  { 'name': 'fred',    'key': 'PQR', 'active': false },
  { 'name': 'pebbles', 'key': 'ABC', 'active': true }
];

// Define API Methods
export default class Api {

    constructor(){
        this.user = false;
        this.httpError = false;
        this.httpResponse = false;
    }

    setApiKey(key) {
        this.key = key;
    }

    authenticate() {

        var authedUser = _.find(users, { 'key': this.key, 'active': true });

        if(authedUser) {
            this.user = authedUser;
            return true;
        }
        else {
            return false;
        }

    }

    handleRequest(city, country, doneCallback) {
        
        if(!this.user) throw new Error('Not Authenticated');      

        return axios.get(gateway, {
            params: {
              q: city + ',' + country
            }
        });  
    }
}

