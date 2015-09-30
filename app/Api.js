import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

// Define App constants
const gateway = 'http://api.openweathermap.org/data/2.5/weather';
const rateLimit = 10;
const users = [{
    'name': 'zuhair',
    'key': 'ABC',
    'active': true
}, {
    'name': 'dylan',
    'key': 'DEF',
    'active': true
}, {
    'name': 'sam',
    'key': 'GHI',
    'active': true
}, {
    'name': 'ben',
    'key': 'JKL',
    'active': false
}, {
    'name': 'ari',
    'key': 'MNO',
    'active': true
}];

/**
 * Handles all domain logic and commnunication with backend (Weather service)
 */

export default class Api {

    constructor() {
        this.user = false;
        this.httpError = false;
        this.httpResponse = false;
        this.requests = [];
    }

    authenticate(key) {

        var authedUser = _.find(users, {
            'key': key,
            'active': true
        });

        if (authedUser) {
            this.user = authedUser;
            return true;
        } else {
            return false;
        }

    }

    passRateLimit(key) {
        var userRequests = this.requests.filter((req) => {
            return req.key == key && moment().diff(moment(req.timestamp), 'minutes') < 60;
        });
        return userRequests.length < 5 ? true : false;
    }

    handleRequest(city, country) {

        this.requests.push({
            'key': this.user.key,
            'city': city,
            'country': country,
            'timestamp': moment()
        });

        return axios.get(gateway, {
            params: {
                q: city + ',' + country
            }
        });
    }
}
