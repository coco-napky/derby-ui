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
        to={`/index?schema=${index.schemaid}&name=${index.conglomeratename}`}>
        {`${index.conglomeratename}`}
    </Link>
)) : '';

const mapSchemas = (scope, schemas) => schemas.map((schema, index) => (
    <NavItem key={index}>
        <NavLink href="#" onClick={() => scope.toggle(schema.schemaName, `/schema/${schema.schemaName}`)}>{schema.schemaName}</NavLink>
        <Collapse isOpen={scope.state[schema.schemaName]}>
            <NavLink href="#" onClick={() => scope.toggle(`${schema.schemaName}-tables`)}>Tables</NavLink>
            <Collapse isOpen={scope.state[`${schema.schemaName}-tables`]}>
                {mapTables(schema)}
            </Collapse>
            <NavLink href="#" onClick={() => scope.toggle(`${schema.schemaName}-statements`)}>Statements</NavLink>
            <Collapse isOpen={scope.state[`${schema.schemaName}-statements`]}>
                {mapStatements(schema)}
            </Collapse>
            <NavLink href="#" onClick={() => scope.toggle(`${schema.schemaName}-indexes`)}>Indexes</NavLink>
            <Collapse isOpen={scope.state[`${schema.schemaName}-indexes`]}>
                {mapIndexes(schema)}
            </Collapse>
        </Collapse>
    </NavItem>
));

export default mapSchemas;