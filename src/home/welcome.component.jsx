import React, { Component } from 'react'
import logo from '../static/images/logo.jpg';

class WelcomeComponent extends Component {

    constructor(props) {
        super(props) 

        this.state = {
          pageTitle : 'Bienvenue sur cette page'
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-8">
                            <h1>{this.state.pageTitle}</h1>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                  <div className="container-fluid">

                    <div className="text-center">
                      <img src={logo}
                          alt='Logo'
                          className="img-responsive center-block"
                          style={{maxHeight: "300px", paddingBottom: "50px"}}
                          />
                    </div>
              
                    <div className="text-center">Développé par:</div>
                    <div className="text-center">
                      <h3>Daniel Vornicu</h3>
                    </div>
              
                    <div className="text-center">vdany2003@yahoo.com</div>
                  </div>
                </div>
            </div>     
        )
    }
}

export default WelcomeComponent
