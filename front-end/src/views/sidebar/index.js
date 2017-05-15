import React, {Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Collapse } from 'reactstrap';
import QueryService from '../../services/query';
import SessionService from '../../services/session';
import EventService from '../../services/events';
import { browserHistory } from 'react-router';

import './style.scss';

const getSchemaId = (schemaName, data) => {
    let props = Object.keys(data);
    for(let prop of props)
        if(data[prop].schemaName == schemaName)
            return data[prop].schemaId;
        else 
            console.log("data[prop].schemaName == schemaName ", data[prop], schemaName);
    return null;
}

const getSchemas = data => {
    let props = Object.keys(data);
    let set = new Set();
    let schemas = [];
    
    for(let prop of props)
        set.add(data[prop].schemaName)
    
    for(let schemaName of set) {
        let schema = [];
        for(let prop of props)
            if(data[prop].schemaName == schemaName)
                schema.push(data[prop])

        schemas.push({
            tables: schema,
            schemaName,
            schemaId: getSchemaId(schemaName, data)
        });
    }
    
    return schemas;
} 

const mapTables = schema => schema.tables.map((table, index) => (
    <Link key={index} className="d-block" to={`/table?schema=${table.schemaName}&name=${table.identifier}`}>{`${table.identifier}`}</Link>
));

const mapSchemas = (scope, schemas) => schemas.map((schema, index) => (
    <NavItem key={index}>
        <NavLink href="#" onClick={() => scope.toggle(schema.schemaName, `/schema/${schema.schemaName}`)}>{schema.schemaName}</NavLink>
        <Collapse isOpen={scope.state[schema.schemaName]}>
            {mapTables(schema)}
        </Collapse>
    </NavItem>
));

class Sidebar extends Component {
    state = {  }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = { collapse: false, schemas: [] };

         QueryService.getTables()
        .then(response => {
            if(response.data.status)
                this.loadTables(response.data.data);
            return QueryService.getStatements();
        })
        .then(response => {
            this.loadStatements(response.data.data)
        })
        
    }

    loadStatements(data) {
        let statements = data.myArrayList.map(s => s.map);
        for(let schema of this.state.schemas) {
            schema.statements = [];
            for(let statement of statements)
                if(schema.schemaId == statement.schemaid) 
                    schema.statements.push(statement);
                else
                    console.log("schema.schemaId ", schema.schemaId, statement.schemaid);
        }
        console.log(this.state.schemas);

    }

    loadTables(data) {
        let schemas = getSchemas(data);
        this.setState({...this.state, schemas})
    }

    toggle(prop, url) {
        
        let state = this.state;
        console.log("state[prop] ", state[prop], prop);
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
                <Nav vertical className="flex-column justify-content-center">
                    {mapSchemas(this, this.state.schemas)}
                    <NavItem>
                        <NavLink href="#" onClick={() => this.logout()}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default Sidebar;