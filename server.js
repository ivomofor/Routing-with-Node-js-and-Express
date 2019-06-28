const express = require('express');
const app = express();


//setting rout port and environment variables 
app.set('port', process.env.PORT || 4000);

// UNDERSTANDING EXPRESS ROUTING ... email me: ivomofor@live.com :)

/**
app.use(function(req, res, next){
console.log('processing request for "' + req.url + '"....');
next();
});
app.use(function(req, res, next){
console.log('terminating request');
res.send('thanks for playing!');
// note: I do NOT call next() here...this terminates the request
});
app.use(function(req, res, next){
console.log('whoops, i\'ll never get called!');
});

Here we have three middlewares. The first one simply logs a message to the console
before passing on the request to the next middleware in the pipeline by calling
next(). Then the next middleware actually handles the request. Note that if we omitted
the res.send here, no response would ever be returned to the client. Eventually the
client would time out. The last middleware will never execute, because all requests are
terminated in the prior middleware.
 */


 //Now a more complicated, complete example:
app.use(function(req, res, next){ // this middleware always runs when you make a  request to localhost://4000/*
    console.log('\n\nALLWAYS');    // it will console log the message "ALLWAYS" and calls the next middlewar
    next();                        // take not it will not call a route handler... it calls only a middleware
});
app.get('/a', function(req, res){          // here a request to localhost://4000/a will console log the message: /a: route terminated
    console.log('/a: route terminated');    // and sends a response to the client "a". since this request is not a error... the next middleware 
    res.send('a');                        // which is not an error route runs and console log the message "route not handle"
});
app.get('/a', function(req, res){   // this route never gets called because the first route to localhost://4000/a terminated the request
    console.log('/a: never called'); // and send a response back to the client 
});
app.get('/b', function(req, res, next){ // a call to localhost://400/b logs the message "/b: route not terminated". it calls the net 
    console.log('/b: route not terminated'); // and calls the next middleware bellow it. the middleware will log the message "SOMETIMES" which console logs a message and 
    next(); // throws a new error to the next error handler middleware which logs the message "/b error detected and passed on" and passes the error object to te next() method as a prammeta which tnen calls the final middleware and not the next route middleware...*take not*
});
app.use(function(req, res, next){ // the middleware always runs whe  the first middleware from above it runs and  alls for it
    console.log('SOMETIMES');       // with tne next() method. it also call the next middleware bellow it using its next() method as well.
    next();
});
app.get('/b', function(req, res, next){
    console.log('/b (part 2): error thrown' );
    throw new Error('b failed');
});
app.use('/b', function(err, req, res, next){
    console.log('/b error detected and passed on');
    next(err);
});
app.get('/c', function(err, req){ // a request to this route gets called when the two middleware abouve it first runs. it then logs "c? error thrown" and throws and error object 
    console.log('/c: error thrown'); // to the next error middleware available  
    throw new Error('c failed');
});
app.use('/c', function(err, req, res, next){ // this error middleware will log a message and  calls the next error middleware 
    console.log('/c: error deteccted but not passed on');
    next();
});
app.use(function(err, req, res, next){  // this is and error middleware for all error routes and and error middlewares 
    console.log('unhandled error detected: ' + err.message); // it logs a message with the error object which has a message property
    res.send('500 - server error');
});
 app.use(function(req, res){           // this middeware will always run if there are not errors 
    console.log('route not handled');   // it runs when it is being called by using the next() mothod 
     res.send('404 - not found');       // of any none error route or middleware above it
});

// configuring server listening port...
app.listen(app.get('port'), ()=>{
    console.log('Éxpress running on port:' +app.get('port')+'press Ctrl to exit!')
});