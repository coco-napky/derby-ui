import React, {Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import QueryService from '../../services/query';
import SessionService from '../../services/session';
import EventService from '../../services/events';
import mapSchemas from './mapSchema';
import {Link} from 'react-router-dom';
import './style.scss';

const getSchemas = (data, state) => {
    let props = Object.keys(data);
    let {schemas} = state;
    
    for(let schema of schemas) {
        schema.tables = [];
        schema.schemaName = schema.schemaname;
        schema.schemaId = schema.schemaid;
        for(let prop of props)
            if(data[prop].schemaName === schema.schemaName)
                schema.tables.push(data[prop])
    }
    return schemas;
} 

class Sidebar extends Component {
    state = {  }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.username = SessionService.getSession().user;
        this.state = { collapse: false, schemas: [], 
            users: [], constraints: [], triggers: []
        };
        QueryService.getSchemas()
        .then(response => {
            let schemas = response.data.data
            .myArrayList.map(s => s.map);

            this.setState({...this.state, schemas})
            return QueryService.getTables();
        })
        .then(response => {
            if(response.data.status)
                this.loadTables(response.data.data);
            return QueryService.getStatements();
        })
        .then(response => {
            this.loadToSchema(response.data.data, 'statements')
            return QueryService.getIndexes();
        })
        .then(response => {
            this.loadToSchema(response.data.data, 'indexes');
            return QueryService.getUsers();
        })
        .then(response => {
            this.loadUsers(response.data.data);
            return QueryService.getConstraints();
        })
        .then(response => {
            this.loadToSchema(response.data.data, 'constraints');         
            return QueryService.getTriggers();
        })
        .then(response => {
            this.loadToSchema(response.data.data, 'triggers');      
        })
        
    }

    loadUsers(data) {
        this.setState({...this.state, users: data});
    }

    loadToSchema(data, prop) {
        let items = data.myArrayList.map(i => i.map);
         for(let schema of this.state.schemas) {
            schema[prop] = [];
            for(let item of items)
                if(schema.schemaId === item.schemaid) 
                    schema[prop].push(item);
        }
    }

    loadTables(data) {
        let schemas = getSchemas(data, this.state);
        this.setState({...this.state, schemas})
    }

    toggle(prop, url) {
        
        let state = this.state;
        state[prop] = !state[prop];
        this.setState({...this.state});

        if(url)
            this.props.history.push(url)
    }
    
    logout() {
        EventService.emit('logout');
        SessionService.clear();
    }

    render() {
        return (
            <div className="sidebar-wrapper white">
                <h5 className="">Derby UI</h5>
                <h5 className="mb-2 p-0">{this.username}</h5>
                <Nav vertical className="flex-column justify-content-center">
                    {this.state.schemas.length > 0 ? mapSchemas(this, this.state.schemas) : ''}
                    <NavItem>
                        <Link to="/users" >Users</Link>
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