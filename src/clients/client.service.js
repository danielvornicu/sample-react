import axios from 'axios';

let isJsonServer  = false;

//using json-server based on src/json/clients.json file
//start: json-server --watch src\json\clients.json --port 3001
//const CLIENT_API_BASE_URL = "http://localhost:3001/api/clients";
//Spring Boot Api
//const CLIENT_API_BASE_URL = "http://localhost:8090/clients";
//Flask API on Heroku
const CLIENT_API_BASE_URL = "https://young-meadow-54300.herokuapp.com/clients";



class ClientService {

    //get all clients
    findAll(){
        return axios.get(CLIENT_API_BASE_URL);
    }

    //get client by id
    findById(id){
        return axios.get(CLIENT_API_BASE_URL + '/' + id);
    }

    //get storage mode
    getStorageMode(){
        if (isJsonServer){
            return 'json'
        } else {
            return 'db'
        }
    }

    //create new Client or update existing one(HTTP POST)
    save(client, isCreation){
        let url;
        
        if (isCreation){//creation
            if (isJsonServer){
                url = CLIENT_API_BASE_URL
            } else {
                url = CLIENT_API_BASE_URL + '/new';
            }
        } else { //modification
            if (isJsonServer){
                url = CLIENT_API_BASE_URL + '/' + client.id;
                return axios.put(url, client);
            } else {
                url = CLIENT_API_BASE_URL + '/' + client.id + '/edit';
            }
      }

      return axios.post(url, client);
    }

    //delete a client by id (HTTP GET)
    deleteById(id){
        let url;
        if (isJsonServer){
            url = CLIENT_API_BASE_URL + '/'+ id;
            return axios.delete(url);
        } else {
            url = CLIENT_API_BASE_URL + '/'+ id + '/delete';
            return axios.get(url);
        }
    }

}

export default new ClientService()