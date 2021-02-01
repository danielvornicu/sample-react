import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { ClientReducer} from '../reducers/ClientReducer';

// initital state
const initialState = {
    clients: [],
    selectedClient: null
}
const isJsonServer  = false;

//using json-server based on src/json/clients.json file
//start: json-server --watch src\json\clients.json --port 3001
//const CLIENT_API_BASE_URL = "http://localhost:3001/clients";
//Spring Boot Api
//const CLIENT_API_BASE_URL = "http://localhost:8090/clients";
//SpringBoot API on Heroku
const CLIENT_API_BASE_URL = "https://sample-crud-springboot.herokuapp.com/clients";

// create context
const ClientContext = createContext(initialState);

// provider component
const ClientContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ClientReducer, initialState);
    //const [clients, setClients] = useState([]);

    //get all clients
    const findAll = async () => {
        try {
          let response = await axios.get(CLIENT_API_BASE_URL);
          let { data } = response;
    
          dispatch({ type: "FIND_ALL", payload: data });
          return data;

        } catch (error) {
          console.error(error);
        }
    };

    //get client by id
    const findById = async (id) =>{
         try {
            let response = await axios.get(CLIENT_API_BASE_URL + '/' + id);
            let { data } = response;

            dispatch({ type: "FIND_BY_ID", payload: data });
            return data;

          } catch (error) {
            console.error(error);
          }
     }

    //get storage mode
    const getStorageMode = () => {
        if (isJsonServer){
            return 'json'
        } else {
            return 'db'
        }
    }

    //create new Client or update existing one(HTTP POST)
    const save = async (client, isCreation) => {
        try {
            let url;
            let response;
        
            if (isCreation){//creation
                if (isJsonServer){
                    url = CLIENT_API_BASE_URL
                } else {
                    url = CLIENT_API_BASE_URL + '/new';
                }
                response = await axios.post(url, client);

                //let { data } = response;
                dispatch({ type: "ADD", payload: client });

            } else { //modification
                if (isJsonServer){
                    url = CLIENT_API_BASE_URL + '/' + client.id;
                    //console.log('put'+url+client);
                    response = await axios.put(url, client);
                } else {
                    url = CLIENT_API_BASE_URL + '/' + client.id + '/edit';
                    response = await axios.post(url, client);
                }
                //let { data } = response;
                dispatch({ type: "EDIT", payload: client });
          }
          //console.log(data);
          //return data;

        } catch (error) {
          console.error(error);
        }
    }

    //delete a client by id 
    const deleteById = async (id) => {

        try {
            let url;
            let response;
            if (isJsonServer){
                url = CLIENT_API_BASE_URL + '/'+ id;
                response = await axios.delete(url);
            } else {
                url = CLIENT_API_BASE_URL + '/'+ id + '/delete';
                response = await axios.get(url);
            }

            //let { data } = response;
      
            dispatch({ type: "DELETE_BY_ID", payload: id });
            //console.log(data);
            //return data;
          } catch (error) {
            console.error(error);
          }
    }
    


    return (<ClientContext.Provider value={{ clients: state.clients, 
                                             client: state.selectedClient,
                                             findAll,
                                             findById,
                                             getStorageMode,
                                             save,
                                             deleteById
                                           }}>
        {children}
    </ClientContext.Provider>);
}

export { ClientContext, ClientContextProvider };