import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { ClientContext } from "../contexts/ClientContext";
import messages from '../static/messages.json';

const  ClientListeComponent  = () => {
    const { clients, findAll, deleteById, getStorageMode } = useContext(ClientContext);

    useEffect(() => {
        findAll();
    }, [clients])

    return clients?.length ? (
        <div className='card'>
            <div className='card-header'>
                <div className="row">
                    <div className="col-md-8">
                        <h1>{ messages.liste.clients.react.titre}</h1>
                    </div>
                </div>
            </div>

            <div className='card-body'>
                <div className='table-responsive'>
                    <table className = 'table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>{messages.fiche.client.nom}</th>
                                <th>{messages.fiche.client.prenom}</th>
                                <th>{messages.liste.actions.titre}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients.map(
                                    client => 
                                    <tr key = {client.id}>
                                        <td> {client.nom} </td>   
                                        <td> {client.prenom}</td>
                                        <td>
                                            <Link to={`/clients/${client.id}`} className="btn btn-outline-primary btn-sm">
                                                    { messages.liste.actions.consulter}
                                            </Link> | 
                                            <Link to={`/clients/${client.id}/edit`} className="btn btn-outline-primary btn-sm" >
                                                { messages.liste.actions.modifier}
                                            </Link> | 
                                            <button  className="btn btn-outline-primary btn-sm" 
                                                     title="{{ messages.liste.actions.supprimerTitle}}"
                                                     onClick={ () => deleteById(client.id)}
                                                     >
                                                { messages.liste.actions.supprimer} <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className='panel'>
                    <Link to={'/clients/new'} className="btn btn btn-outline-primary btn-sm">
                       { messages.fiche.boutons.creer}
                    </Link>
                </div>

                </div>
                <p>Storage mode: {getStorageMode()} </p>
        </div>
        
    ): 
    (
        <div className="empty"><h4 className="text-center">{messages.liste.clients.listeVide}</h4></div>
    );
    
}

export default ClientListeComponent;
