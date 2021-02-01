import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { ClientContext } from "../contexts/ClientContext";
import messages from '../static/messages.json';

const  ClientConsultComponent  = () => {

    const { id } = useParams();
    const { client, findById } = useContext(ClientContext);

    useEffect(() => {
        findById(id);
    }, [id]);

    return (
        <div className='card'>
            
            <div className='card-header'>
                <h4>{ messages.fiche.client.titres.consultation  + client?.prenom + ' ' + client?.nom}</h4>
            </div>

            <div className='card-body'>
                <div className='row'>
                <div className='col-md-2'>{messages.fiche.client.nom}</div>
                <div className='col-md-4'>{client?.nom}</div>
                </div>
                <div className='row'>
                <div className='col-md-2'>{messages.fiche.client.prenom}</div>
                <div className='col-md-4'>{client?.prenom}</div>
                </div>
            </div>

            <div className='card-footer'>
                <Link to={'/clients'} className='btn btn-outline-secondary'>
                  <i className='fa fa-chevron-left'></i> {messages.fiche.boutons.annuler}
                </Link>
                <Link to={`/clients/${id}/edit`} className='btn btn-outline-primary'>
                  {messages.liste.actions.modifier}
                </Link>
            </div> 
        </div>
    )
}

export default ClientConsultComponent