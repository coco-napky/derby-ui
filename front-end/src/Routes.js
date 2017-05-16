import React, {Component} from 'react';
import Sidebar from './views/sidebar';
import Login from './views/login';
import SchemaDetails from './views/schema';
import TableView from './views/table';
import StatementView from './views/statement';
import ConstraintView from './views/constraint';
import IndexesView from './views/indexes';
import TriggerView from './views/trigger';
import Users from './views/users';
import { BrowserRouter, Route } from 'react-router-dom'
import SessionService from './services/session';
import EventService from './services/events';

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
            <Route path="/table/" component={TableView} />
            <Route path="/users/" component={Users} />
            <Route path="/statement/" component={StatementView} />
            <Route path="/index/" component={IndexesView} />
            <Route path="/constraint/" component={ConstraintView} />
            <Route path="/trigger/" component={TriggerView} />
          </div>
        </BrowserRouter>
      );
    
      return (
        <Content className="h-100"/>
      );
    }
  }

export default Routes;

    

