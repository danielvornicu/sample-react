//module definitions for express app
const express = require('express');
const path = require('path');
const port = process.env.PORT || '8080';
// create express app
const app = express();

//json server as REST API
const jsonServer = require('json-server');
const server = jsonServer.create(); 
// Returns an Express router
const router = jsonServer.router('./src/json/clients.json');
//const middlewares = jsonServer.defaults({ noCors: false });
const portApi = process.env.PORT || '8081';

//APP settings
// Serve only the static files form the build directory
//app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static('build'));

//Wait for a request to any path and redirect all of the requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the app by listening on desired port(ex: Default Heroku port 8080)
app.listen(port, () => {
  console.log(`Running server(HTTP) on localhost:${port}`);
});
//APP settings end

//settings for json server as REST API
// Set default middlewares (logger, static, cors and no-cache)
//server.use(middlewares);
server.use(jsonServer.defaults());
server.use(router);
server.listen(portApi,() => {
  console.log(`Running json-server(API) on localhost:${portApi}`);
});
//settings for json server as REST API end
