import React, { Component } from 'react'
import ClientService from './client.service'
import messages from '../static/messages.json';

class ClientFicheComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            nom: '',
            prenom: ''
        }
       // this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
       this.cancel = this.cancel.bind(this);
       this.delete = this.delete.bind(this);
    }

    componentDidMount(){
        if(typeof(this.state.id) === 'undefined'){
            return
        }else{
            ClientService.findById(this.state.id).then( (res) =>{
                let client = res.data;
                this.setState({id: client.id,
                               nom: client.nom,
                               prenom: client.prenom
                              });
            });
        }        
    }
    
    save = (e) => {
        e.preventDefault();
        let client = {id: this.state.id, nom: this.state.nom, prenom: this.state.prenom};

        console.log('client => ' + JSON.stringify(client));

        if(typeof(this.state.id) === 'undefined'){
            ClientService.save(client, true).then(res =>{
                this.props.history.push('/clients');
            });
        }else{
            ClientService.save(client, false).then( res => {
                this.props.history.push('/clients');
            });
        }
    }
    

    cancel(){
        this.props.history.push('/clients');
    }

    delete(){
        console.log(this.state.id);
        ClientService.deleteById(this.state.id).then( res => {
            this.props.history.push('/clients');
        });
    }

    changeNomHandler= (event) => {
        this.setState({nom: event.target.value});
    }

    changePrenomHandler= (event) => {
        this.setState({prenom: event.target.value});
    }

    getTitle(){
        if(typeof(this.state.id) === 'undefined'){
            return messages.fiche.client.titres.creation;
        }else{
            return messages.fiche.client.titres.modification + this.state.prenom + ' ' + this.state.nom;
        }
    }


    render() {
        return (
                <div className="card">
                    <form>
                        <div className="card-header">
                            <h4>{this.getTitle()}</h4>
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
                                            value={this.state.nom}
                                            onChange={this.changeNomHandler}
                                            placeholder={messages.fiche.client.nomPlaceHolder}
                                            required/>
                                </div>
                            </div>
                    
                            <div className="form-group row mb-2">
                                <label className="col-md-2 col-form-label"
                                        htmlFor="clientPrenomId">{ messages.fiche.client.prenom}</label>
                                <div className="col-md-8">
                                    <input className="form-control"
                                            id="clientPrenomId"
                                            name="prenom"
                                            value={this.state.prenom}
                                            onChange={this.changePrenomHandler}
                                            type="text"
                                            placeholder={messages.fiche.client.prenomPlaceHolder} 
                                            required/>
                                </div>
                            </div>
                        </div>

                        <div className='card-footer'>
                            <button className="btn btn-primary mr-3"
                                    style={{width: "100px"}}
                                    type="submit"
                                    onClick={this.save}
                                    >{messages.fiche.boutons.valider}

                            </button>

                            <button className="btn btn-outline-secondary mr-3"
                                    style={{width: "100px"}}
                                    type="button"
                                    title="{messages.fiche.boutons.annulerTitle}"
                                    onClick={this.cancel}
                                    >{messages.fiche.boutons.annuler}
                            </button>  

                            <button className="btn btn-outline-warning"
                                style={{width: "100px"}}
                                type="button"
                                title="{messages.fiche.boutons.supprimerTitle}"
                                onClick={this.delete}
                                disabled={typeof(this.state.id) === 'undefined'}
                                >{messages.fiche.boutons.supprimer}
                            </button>        
                        </div>
                    </form>

                </div>
        )
    }
}

export default ClientFicheComponent