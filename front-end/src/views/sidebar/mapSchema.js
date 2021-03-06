import React from 'react';
import { NavItem, NavLink, Collapse } from 'reactstrap';
import {Link} from 'react-router-dom';

const mapTables = schema => schema.tables.map((table, index) => (
    <Link key={index} className="d-block" to={`/table?schema=${table.schemaName}&name=${table.identifier}`}>{`${table.identifier}`}</Link>
));

const mapStatements = schema => schema.statements ? schema.statements.map((statement, index) => (
    <Link key={index} className="d-block" 
        to={`/statement?schema=${schema.schemaName}&id=${statement.stmtid}`}>
        {`${statement.stmtname}`}
    </Link>
)) : '';

const mapIndexes = schema => schema.indexes ? schema.indexes.map((index, i) => (
    <Link key={i} className="d-block" 
        to={`/index?schema=${schema.schemaName}&id=${index.conglomerateid}`}>
        {`${index.conglomeratename}`}
    </Link>
)) : '';

const mapConstraints = schema => schema.constraints ? schema.constraints
.filter(c => c.type === 'P' || c.type === 'F')
.map((constraint, i) => (
    <Link key={i} className="d-block" 
        to={`/constraint?schema=${schema.schemaName}&id=${constraint.constraintid}`}>
        {`${constraint.constraintname}`}
    </Link>
)) : '';

const mapTriggers = schema => schema.triggers ? schema.triggers
.map((trigger, i) => (
    <Link key={i} className="d-block" 
        to={`/trigger?schema=${schema.schemaName}&id=${trigger.triggerid}`}>
        {`${trigger.triggername}`}
    </Link>
)) : '';

const isEmpty = (schema, prop) => schema[prop] && schema[prop].length > 0;

const mapSchemas = (scope, schemas) => schemas.map((schema, index) => (
    <NavItem key={index}>
        <NavLink href="#" onClick={() => scope.toggle(schema.schemaName, `/schema/${schema.schemaName}`)}>{schema.schemaName}</NavLink>
        <Collapse isOpen={scope.state[schema.schemaName]}>
            <NavLink href="#" onClick={() => scope.toggle(`${schema.schemaName}-tables`)}>Tables</NavLink>
            <Collapse isOpen={scope.state[`${schema.schemaName}-tables`]}>
                {isEmpty(schema, 'tables') ? mapTables(schema) : ''}
            </Collapse>
            <NavLink href="#" onClick={() => scope.toggle(`${schema.schemaName}-statements`)}>Statements</NavLink>
            <Collapse isOpen={scope.state[`${schema.schemaName}-statements`]}>
                {isEmpty(schema, 'statements') ? mapStatements(schema) : ''}
            </Collapse>
            <NavLink href="#" onClick={() => scope.toggle(`${schema.schemaName}-indexes`)}>Indexes</NavLink>
            <Collapse isOpen={scope.state[`${schema.schemaName}-indexes`]}>
                {isEmpty(schema, 'indexes') ? mapIndexes(schema) : ''}
            </Collapse>
            <NavLink href="#" onClick={() => scope.toggle(`${schema.schemaName}-constraints`)}>Constraints</NavLink>
            <Collapse isOpen={scope.state[`${schema.schemaName}-constraints`]}>
                {isEmpty(schema, 'constraints') ? mapConstraints(schema) : ''}
            </Collapse>      
            <NavLink href="#" onClick={() => scope.toggle(`${schema.schemaName}-triggers`)}>Triggers</NavLink>
            <Collapse isOpen={scope.state[`${schema.schemaName}-triggers`]}>
                {isEmpty(schema, 'triggers') ? mapTriggers(schema) : ''}
            </Collapse>             
        </Collapse>
    </NavItem>
));

export default mapSchemas;