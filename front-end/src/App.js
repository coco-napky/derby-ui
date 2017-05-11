import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import './styles/master.scss';
import Routes from './Routes';


class App extends Component {
  render() {
    return (
      <Routes className="h-100"/>
    );
  }
}

export default App;

