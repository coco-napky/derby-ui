import React, {Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Collapse } from 'reactstrap';
import SessionService from '../../services/session';
import EventService from '../../services/events';
import './style.scss';

class Sidebar extends Component {
    state = {  }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.state = { collapse: false };
    }

    toggle(prop) {
        let state = this.state;
        state[prop] = !state[prop];
        this.setState({...this.state});
    }
    
    logout() {
        EventService.emit('logout');
        SessionService.clear();
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
                    <NavItem>
                        <NavLink href="#" onClick={() => this.logout()}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default Sidebar;