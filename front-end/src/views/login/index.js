import React, { Component } from 'react';
import TabbedContent from './TabbedContent';
import "./style.scss";

class Login extends Component {
    render() {
        return (
            <div className="vw-login h-100 w-100 d-flex flex-row justify-content-center">
                <TabbedContent/>
            </div>
        );
    }
}

export default Login;