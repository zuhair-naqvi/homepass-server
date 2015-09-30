import Api from './Api';
import Hapi from 'hapi';
import Boom from 'boom';

var server = new Hapi.Server();
server.connection({ port: 3000 });

var apiObj = new Api();

server.route({
    method: 'POST',
    path: '/weather',
    handler: function (request, reply) {

        if(!apiObj.authenticate(request.payload.api_key)) {
           reply(Boom.unauthorized('Invalid API Key')); 
        }          

        if(!apiObj.passRateLimit(request.payload.api_key)) {
            reply(Boom.tooManyRequests('Rate limit of 5 requests per hour exceeded for your API key'));
        }      

        apiObj.handleRequest(request.payload.city, request.payload.country)
            .then((response)=>{
                reply(response.data.weather[0].description);
            })
            .catch((error) => {
                reply(Boom.expectationFailed('There was problem retreiving weather data, please try again later'));
            });
    }
});

server.route({
    method: 'GET',
    path: '/log',
    handler: function (request, reply) {
        reply({'requests': apiObj.requests});
    }
});


server.start(() => {
    console.log('REST Endpoint:', server.info.uri + '/weather');
});