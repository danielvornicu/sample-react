//json server as REST API
const jsonServer = require('json-server');
const server = jsonServer.create(); 
// Returns an Express router
const router = jsonServer.router('./src/json/clients.json');
//const middlewares = jsonServer.defaults({ noCors: false });
const middlewares = jsonServer.defaults();
const portApi = process.env.PORT || '3000';


//settings for json server as REST API
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(router);
server.listen(portApi,() => {
  console.log(`Running json-server(API) on localhost:${portApi}`);
});
//settings for json server as REST API end
