import React from 'react';
import { NavItem, NavLink, Collapse } from 'reactstrap';
import {Link} from 'react-router-dom';

const mapUsers = (scope, users) => (
    <NavItem>
        <NavLink href="#" onClick={() => scope.toggle("users")}>Users</NavLink>
        <Collapse isOpen={scope.users}>
            
        </Collapse>
    </NavItem>
);

export default mapUsers;