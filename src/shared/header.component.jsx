import React, { Component } from 'react'
import messages from '../static/messages.json';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                    <div>
                      <Link to="/clients" className="navbar-brand">{ messages.liste.clients.react.titre}</Link>
                    </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent