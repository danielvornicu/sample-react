import React, { Component } from 'react'
import ClientService from './client.service'
import messages from '../static/messages.json';

class ClientConsultComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            client: {}
        }

        this.cancel = this.cancel.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount(){
        ClientService.findById(this.state.id).then( res => {
            this.setState({client: res.data});
        })
    }

    cancel(){
        this.props.history.push('/clients');
    }

    edit(id){
        this.props.history.push(`/clients/${id}/edit`);
    }

    render() {
        return (
            <div className='card'>
                
                <div className='card-header'>
                    <h4>{ messages.fiche.client.titres.consultation  + this.state.client.prenom + ' ' + this.state.client.nom}</h4>
                </div>

                <div className='card-body'>
                    <div className='row'>
                    <div className='col-md-2'>{messages.fiche.client.nom}</div>
                    <div className='col-md-4'>{this.state.client.nom}</div>
                    </div>
                    <div className='row'>
                    <div className='col-md-2'>{messages.fiche.client.prenom}</div>
                    <div className='col-md-4'>{this.state.client.prenom}</div>
                    </div>
                </div>

                <div className='card-footer'>
                    <button className='btn btn-outline-secondary'
                            style={{width: "100px"}}
                            onClick={this.cancel}
                            >
                    <i className='fa fa-chevron-left'></i> {messages.fiche.boutons.annuler}
                    </button>

                    <button className="btn btn-outline-primary"
                        style={{width: "100px"}}
                        onClick={ () => this.edit(this.state.id)}
                        title="{messages.liste.actions.modifierTitle}">{messages.liste.actions.modifier}
                    </button>
                </div> 


            </div>
        )
    }
}

export default ClientConsultComponent