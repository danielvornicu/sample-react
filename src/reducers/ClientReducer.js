export const ClientReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
        case 'FIND_ALL':
            //console.log('findAll' + payload);
            return {
                    ...state,
                    clients : payload
                }    
        case 'FIND_BY_ID':
            //console.log('findById' + payload);
            return {
                    ...state,
                    selectedClient : payload
                }    
        case 'ADD':
            console.log('add' + payload);    
            return {
                ...state,
                clients : [...state.clients, payload]
            }   

        case 'EDIT':
            console.log('edit' + payload);    
            const updatedClient = payload;

            const updatedClients = state.clients.map(client => {
              if (client.id === updatedClient.id) {
                return updatedClient;
              }
              return client;
            })
            return {
              ...state,
              clients: updatedClients
            }

        case 'DELETE_BY_ID':
            //console.log('deleteById' + payload);
            return {
                ...state,
                clients: state.clients.filter(client => {
                    return client.id !== payload
                })
            }
 
        default: 
          return state;
    }
};
