node --version => v12.13.0 (Node version)
npm --version  => 6.12.0 (Npm version)
Using 'Create React App' CLI

Create app 'sample-react'
Using npx:
>npx create-react-app sample-react    --capital letters not alowed
Using npm:
>npm init react-app sample-react
>cd sample-react
sr>npm start
http://localhost:3000/

Install dependencies: bootstrap, font-awesome
>npm install bootstrap font-awesome --save
For our API calls(Spring Boot API), we will be using Axios. Others options are: Axios,Fetch,Superagent,React-axios,Use-http,React-request
Below is the npm command to install Axios
>npm add axios
For a fake Json server based on json file we cand install json-server
>npm install json-server
Start JSON Server with json file as input:
>json-server --watch src\json\clients.json --port 3001

Import this styles globally in your React app entry file(src/index.js):
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

Project structure:
Folder src/clients with:
client.service.js
client-liste.component.jsx
client-consult.component.jsx
client-fiche.component.jsx
Folder src/shared with:
header.component.jsx
footer.component.jsx
Folder src/home with:
welcome.component.jsx
Folder src/static with:
messages.json
Folder src/json with:
clients.json

Configure React App Routing
To use React Router, you first have to install it using NPM:
>npm install react-router-dom
Then in App component(App.js) import BrowserRouter, Route, Switch from 'react-router-dom' package:
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
and:
import ClientListeComponent from './clients/client-liste.component';
import ClientConsultComponent from './clients/client-consult.component';
import ClientFicheComponent from './clients/client-fiche.component';

In Spring App:
Suport CORS in Spring App, add @CrossOrigin annotation to the rest controller to specify that calls will be made to this controller from different domains
(In our case we have specified that a call can be made form localhost:3000)
@CrossOrigin(origins = "http://localhost:3000")
@RestController

In React APP:
If you are using Json Server Npm module change the url in ClientService: 
const CLIENT_API_BASE_URL = "http://localhost:3001/clients" and let isJsonServer  = true;
For Spring Boot API
const CLIENT_API_BASE_URL = "http://localhost:8090/clients"; and let isJsonServer  = false;


A simple client for REST api in ReactJS:
http://localhost:3000/clients                    HTTP GET         - get all clients
http://localhost:3000/clients/new                HTTP GET/POST    - create client
http://localhost:3000/clients/1                  HTTP GET         - consult client
http://localhost:3000/clients/1/edit             HTTP GET/POST    - edit client or PUT for Json Server ( modification)
http://localhost:3000/clients/1/delete           HTTP GET or HTTP DELETE for Json Server  - delete client

http://localhost:3000/welcome - test page

Github:


Deploy Sample-react application on Heroku with Heroku CLI:
1.First of all, we need a server for our application and what we are going to use is the Express server.
Locally we run ng serve from terminal to run our app on local browser.
Install il with:
   npm install express --save
2. Now we need a script in JS to tell Express what to do, I like to call it server.js (in your project’s root directory)
Test That Everything is OK:
>ng build  - build and create dist folder
>node server.js -lance the app
3.Change start command
In package.json, change the “start” command to node server.js so:
   "start": "ng serve -o"  becomes:  "start": "node server.js"
We can add also Node and NPM engines that Heroku will use to run your application. 
Preferably, it should be same version you have on your machine.
So, run node -v and npm -v to get the correct version and include it in your package.json file like so:
"engines": {
    "node": "12.13.0",
    "npm": "6.12.0"
  }


