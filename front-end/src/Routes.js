import React from 'react';
import Sidebar from './views/sidebar';
import Home from './views/home';
import Login from './views/login';
import { BrowserRouter, Route } from 'react-router-dom'
import SessionService from './services/session';

const Routes = (props) => {
    let session = SessionService.getSession();
    
    let Content = ()  => !session ? (<Login/>) : (
      <BrowserRouter {...props}>
        <div className="h-100 d-flex justify-content-space">
          <Route path="/" component={Sidebar} />
          <Route path="/" component={Home} />
        </div>
      </BrowserRouter>
    );
    
    return (
      <Content className="h-100"/>
    );
  }
;

export default Routes;
    

