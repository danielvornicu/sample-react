import React, { Component } from 'react'
import ClientService from './client.service'
import messages from '../static/messages.json';

class ClientListeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
                clients: []
        }

        this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        this.edit = this.edit.bind(this);
        
    }

    create(){
        this.props.history.push('/clients/new');
    }

    show(id){
        this.props.history.push(`/clients/${id}`);
    }

    edit(id){
        this.props.history.push(`/clients/${id}/edit`);
    }

    delete(id){
        ClientService.deleteById(id).then( res => {
            this.setState({clients: this.state.clients.filter(clients => clients.id !== id)});
        });
    }

    componentDidMount(){
        ClientService.findAll().then((res) => {
            console.log(res.data);
            this.setState({ clients: res.data});
        });
    }



    render() {
        return (
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
                                    this.state.clients.map(
                                        client => 
                                        <tr key = {client.id}>
                                            <td> {client.nom} </td>   
                                            <td> {client.prenom}</td>
                                            <td>
                                                <button onClick={ () => this.show(client.id)} className="btn btn-outline-primary btn-sm" title="{{ messages.liste.actions.consulterTitle}}">
                                                    { messages.liste.actions.consulter}
                                                </button> | 
                                                <button onClick={ () => this.edit(client.id)} className="btn btn-outline-primary btn-sm" title="{{ messages.liste.actions.modifierTitle}}">
                                                    { messages.liste.actions.modifier}
                                                </button> | 
                                                <button onClick={ () => this.delete(client.id)} className="btn btn-outline-primary btn-sm" title="{{ messages.liste.actions.supprimerTitle}}">
                                                    { messages.liste.actions.supprimer}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='panel'>
                        <button id='create_bouton'  
                                onClick={this.create}
                                className='btn btn btn-outline-primary btn-sm' title="{ messages.fiche.boutons.creerTitle}">
                            { messages.fiche.boutons.creer}
                        </button>
                    </div>

                 </div>
                 <p>Storage mode: {ClientService.getStorageMode()} </p>
            </div>
            
        )
    }
}

export default ClientListeComponent