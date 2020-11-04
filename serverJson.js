//json server as REST API
const jsonServer = require('json-server');
const server = jsonServer.create(); 
const router  = jsonServer.router('./src/json/clients.json');
//const middlewares = jsonServer.defaults({ noCors: false });
const middlewares = jsonServer.defaults();
const portApi = process.env.PORT || '3001';


//settings for json server as REST API
server.use('/api', router);
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(router);
server.listen(portApi,() => {
  console.log(`Json-server(API) on port :${portApi}`);
});
//settings for json server as REST API end
