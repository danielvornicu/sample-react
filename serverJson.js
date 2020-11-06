//json server as REST API
const express = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create(); 
// Returns an Express router
const router = express.Router();
const mainRoute  = jsonServer.router('./src/json/clients.json');
//const middlewares = jsonServer.defaults({ noCors: false });
const middlewares = jsonServer.defaults();
const portApi = process.env.PORT || '3001';


//settings for json server as REST API
router.use('/', mainRoute);
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(router);
server.listen(portApi,() => {
  console.log(`Json-server(API) started on port :${portApi}`);
});
//settings for json server as REST API end
