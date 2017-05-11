import React, {Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './style.scss';
import {Link} from 'react-router-dom';
import { Collapse } from 'reactstrap';

class Sidebar extends Component {
    state = {  }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

  toggle(prop) {
    let state = this.state;
    state[prop] = !state[prop];
    this.setState({...this.state});
  }


    render() {
        return (
            <div className="sidebar-wrapper white">
                <h5 className="">Derby UI</h5>
                <Nav vertical className="flex-column justify-content-center">
                    <NavItem>
                        <NavLink href="#" onClick={() => this.toggle('user')}>Users</NavLink>
                        <Collapse isOpen={this.state.user}>
                            <Link className="d-block" to="/users">Users</Link>
                            <Link className="d-block" to="/tables">Tables</Link>
                        </Collapse>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={() => this.toggle('schema')}>Schemas</NavLink>
                        <Collapse isOpen={this.state.schema}>
                            <Link className="d-block" to="/users">Users</Link>
                            <Link className="d-block" to="/tables">Tables</Link>
                        </Collapse>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default Sidebar;