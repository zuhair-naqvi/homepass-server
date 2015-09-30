## Usage

* From the root directory (where this file is), execute the `npm run dev` command, copy the URL and port printed in the terminal.
* Install Chrome Advance REST Client https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?utm_source=gmail
* Paste the URL and port into the URL field.
* Select Request type as "POST"
* Under the "Payload" section select the "Form" tab
* Add the following parameters
    - city: A valid city name (Tip: Click 'Add new value' link to add more params)
    - country: Corresponding country name
    - key: ABC (other valid keys are - DEF, GHI, JKL, MNO)
* Click "SEND"
* See results under the "Response" section
* Try the same key more than 5 times consequtively and you'll see a rate limit response
* Try a differnt key or wait an hour and try the same key and it will work again.

## Architecture

The application consists of:
* Api.js - A private, consumer agnostic API layer that handles all domain logic
* Server.js - A public-facing RESTFul API that consumes Api.js

## Tests

This application was written using the BDD (Behaviour Driven Development) methodology with Mocha and Chai frameworks, see apiTests.js

* `npm run test` to execute tests
* `npm run cover` to check test coverage

## Troubleshooting

* npm i --save