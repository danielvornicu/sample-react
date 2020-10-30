import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className = "text-center">
                <footer className = "footer">
                    <span className="text-muted">@2020</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent