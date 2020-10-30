import React, { Component } from 'react'
import messages from '../static/messages.json';

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
                    <div><a href="http://localhost:3000/clients" className="navbar-brand">{ messages.liste.clients.react.titre}</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent