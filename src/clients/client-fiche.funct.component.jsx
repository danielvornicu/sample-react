import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { ClientContext } from "../contexts/ClientContext";
import messages from '../static/messages.json';

const  ClientFicheComponent  = () => {

    const { id } = useParams();
    const history = useHistory();

    const { client, clients, findById, save, deleteById} = useContext(ClientContext);

    const defaultValues = {
        nom: '',
        prenom : ''
    };
    const { register, handleSubmit, watch, errors, setValue, reset} = useForm({defaultValues});

    useEffect(() => {

        const fetchClient = async (id) => {
            const selectedClient = await findById(id);
            //console.log(selectedClient);
            //console.log(client);

            //setValue("nom", client?.nom);
            //setValue("prenom", client?.prenom); 
            reset({
                nom:    `${selectedClient?.nom}`,
                prenom: `${selectedClient?.prenom}`
            });
        }

        if(typeof(id) === 'undefined'){
            return
        } else {  
            fetchClient(id);
        }
    }, []);

    const onSubmit =  (data) => {
        //console.log('client => ' + JSON.stringify(data));
        let client = {id: id, nom: data.nom, prenom: data.prenom};

        if(typeof(id) === 'undefined'){
            save(client, true);
        }else{
            //console.log(client);
            save(client, false);
        }

        //props.history.push("/clients");
        history.push("/clients");
    };

    const deleteThis = async () => {
        deleteById(id);
        //props.history.push("/clients");
        history.push("/clients");
    };

    const getTitle = () => {
        if(typeof(id) === 'undefined'){
            return messages.fiche.client.titres.creation;
        }else{
            return messages.fiche.client.titres.modification + watch("prenom") + ' ' + watch("nom");
        }
    };

    return (
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-header">
                        <h4>{getTitle()}</h4>
                    </div>

                    <div className="card-body">
                        <div className="form-group row mb-2">
                            <label className="col-md-2 col-form-label"
                                    htmlFor="clientNomId">{messages.fiche.client.nom}</label>
                            <div className="col-md-8">
                                <input className="form-control"
                                        id="clientNomId"
                                        name="nom"
                                        type="text"
                                        ref={register({ required: true, 
                                                        minLength: {
                                                            value: 1,
                                                            message: `${messages.fiche.client.validation.nom.minlength}`
                                                        }
                                                     })}
                                        placeholder={messages.fiche.client.nomPlaceHolder}
                                        required/>
                                <small className="form-text text-danger">{errors.nom?.message}</small>       
                            </div>
                        </div>
                
                        <div className="form-group row mb-2">
                            <label className="col-md-2 col-form-label"
                                    htmlFor="clientPrenomId">{ messages.fiche.client.prenom}</label>
                            <div className="col-md-8">
                                <input className="form-control"
                                        id="clientPrenomId"
                                        name="prenom"
                                        type="text"
                                        ref={register({ required: true, 
                                                        minLength: {
                                                            value: 1,
                                                            message: `${messages.fiche.client.validation.prenom.minlength}`
                                                        }
                                                    })}
                                        placeholder={messages.fiche.client.prenomPlaceHolder} 
                                        required/>
                                <small className="form-text text-danger">{errors.prenom?.message}</small>
                            </div>
                        </div>

                    </div>

                    <div className='card-footer'>
                        <button className="btn btn-primary mr-3"
                                style={{width: "100px"}}
                                type="submit"
                                >{messages.fiche.boutons.valider}

                        </button>

                        <Link to="/clients" className="btn btn-outline-secondary mr-3" >
                            {messages.fiche.boutons.annuler}
                        </Link>

                        <button className="btn btn-outline-warning"
                            style={{width: "100px"}}
                            type="button"
                            title="{messages.fiche.boutons.supprimerTitle}"
                            onClick={deleteThis}
                            disabled={typeof(id) === 'undefined'}
                            >{messages.fiche.boutons.supprimer}
                        </button>        
                    </div>
                </form>

            </div>
    )
}

export default ClientFicheComponent