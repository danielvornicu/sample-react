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
>npm install axios
For a fake Json server based on json file we can install json-server
>npm install json-server
Start JSON Server with json file as input:
>json-server --watch src\json\clients.json --port 3001
Then go to:
http://localhost:3001/clients

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

Using Concurrently with json-server and your React App
During the development of a React app, you will be running 'npm start' more times.
If you are working with json-server we run 'json-server --watch db.json' in one terminal then npm start in another terminal.
Install: npm i -S concurrently
In the scripts section of our 'package.json' file, we’ll insert:
"json-server": "json-server --watch src/json/clients.json --port 3001"
and
"dev": "concurrently \"npm start\" \"npm run json-server\""
We combined npm start and the json-server command into “dev” command:
Run: npm run dev
You’ll see that your json-server is running on localhost:3001, and your react app will open automatically.

Using Express(a server for our application, we need a script in JS to tell Express what to do, we call it script.js)
Install Express: npm i express -S
Create a server.js file(server http + json-server that use a json file). I use the default React port 8090(http) and 3001(json-server)
I made a serverJson.js to open the json-server separatelly with: node serverJson.js, test to: http://localhost:3001/clients
For dev server: npm start then http://localhost:3000/clients
For production: npm run build
node server.js then go to: http://localhost:8090/clients
We can use a proxy in package.json
Ex: "proxy": "http://localhost:8090"

Optional using serve package(default port 5000):
npm install -g serve / npm uninstall -g serve 
serve -s build
http://localhost:5000/clients

Github:
git add src/*
git add public/*
git add readme.txt
git commit -m "first commit"
Connect it to github ad create a new repository: sample-react
git remote add origin https://github.com/danielvornicu/sample-react.git
git push -u origin master

Branch sample-react-hooks-context:s
git branch sample-react-hooks-context 
git checkout sample-react-hooks-context
git push --set-upstream origin sample-react-hooks-context

Modifications: App.js: add ClientContextProvider
>npm install react-hook-form
We can install othets deps: bootstrap, reactstrap, uuid if we want
Add 'contexts' directory: ClientContext.js
Add 'reducers' directory and ClientReducer.js
src\clients\ add: client-liste.funct.component.jsx, client-consult.funct.component.jsx, client-fiche.funct.component.jsx that
uses ClientContext(and not ClientService)

VSC Extension: ES7 React/Redux/GraphQL
>rafc _shortcut to create a functional component template


Deploy Sample-react application on Heroku:
1.First of all, we need a server for our application and what we are going to use is the Express server.
Locally we run 'node server.js' from terminal to run our app on local browser.
Install il with:
   npm install express --save / npm i express -S
2. Now we need a script in JS to tell Express what to do, I like to call it server.js (in your project’s root directory)
Test That Everything is OK:
>npm run build  -build and create dist folder
>node server.js -lance the app
3.Change start command
In package.json, change the “start” command to node server.js so:
   "start": "react-scripts start"  becomes:  "start": "node server.js"
We also can create a Procfile with: web: node server.js and leave "start": "react-scripts start" 
We can add also Node and NPM engines that Heroku will use to run your application. 
Preferably, it should be same version you have on your machine.
So, run node -v and npm -v to get the correct version and include it in your package.json file like so:
"engines": {
    "node": "12.13.0",
    "npm": "6.12.0"
  }
  
Procfile
web: node server.js
api: node serverJson.js

heroku ps:scale web=1 api=1

Deploy Sample-react application on GitHub Pages:
1. Install the gh-pages package as a “dev-dependency” of the app.
>npm install gh-pages —-save-dev
2.Add homepage property to package.json file
"homepage": "https://danielvornicu.github.io/sample-react/"
3.Deploy scripts under package.json file
"scripts": {
  //...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
4.Now deploy it to GitHub Pages
>npm run deploy
This command will create a branch named gh-pages at your GitHub repository
Go to {your-GitHub-code-repository} -> settings -> GitHub pages section and setup source to the gh-pages branch
5. Go to: https://danielvornicu.github.io/sample-react/



  


