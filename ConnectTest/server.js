var connect = require('connect');
var app = connect();

//create the logger middleware
var logger = function(req, res, next) {
  console.log(req.method, req.url);

  next();
}

//create a hello world middleware
var helloWorld = function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
}

//createa a goodbye world middleware
var goodbyeWorld = function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Goodbye World');
}

//add the middleware components
app.use(logger);
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);

//list on port 3000
app.listen(3000);

console.log('Server running at http://localhost:3000/');
