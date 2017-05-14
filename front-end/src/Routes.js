import React, {Component} from 'react';
import Sidebar from './views/sidebar';
import Home from './views/home';
import Login from './views/login';
import SchemaDetails from './views/schema';
import { BrowserRouter, Route } from 'react-router-dom'
import SessionService from './services/session';
import EventService from './services/events';

let loggedIn = false;

class Routes extends Component {
  state = {  }

  constructor(props) {
    super(props);
    let session = SessionService.getSession();
    this.state = session ? {loggedIn: session.loggedIn} : {loggedIn: false};
    EventService.on('login', () => this.setState({...this.state, loggedIn: true}));
    EventService.on('logout', () => this.setState({...this.state, loggedIn: false}));
  }
  
  render() {
    
      let Content = ()  => !this.state.loggedIn ? (<Login/>) : (
        <BrowserRouter {...this.props}>
          <div className="h-100 d-flex justify-content-space">
            <Route path="*" component={Sidebar} />
            <Route path="/schema/:schemaName" component={SchemaDetails} />
          </div>
        </BrowserRouter>
      );
    
      return (
        <Content className="h-100"/>
      );
    }
  }

export default Routes;

    

