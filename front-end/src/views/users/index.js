import React, { Component } from 'react';
import QueryService from '../../services/query';
import SessionService from '../../services/session';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Table} from 'reactstrap';
import classnames from 'classnames';
import User from './user';
import CreateForm from './create';
import './style.scss';

class UsersView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            users: []
        };            
        this.toggle = this.toggle.bind(this);
        this.loadData();
    }

    loadData() {
        let session = SessionService.getSession();
        if(session.user === 'admin')
            QueryService.getUsers()
            .then(response => this.setState({...this.state, users: response.data.data}))
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) 
            this.setState({ activeTab: tab});
    }

    render() {
        return (
            <div className="vw-users h-100 w-100">
                <Card className="main-card">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                                User List
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>
                                Create
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="pt-2">
                        <TabPane tabId="1">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>lastModified</th>
                                        <th>HashingScheme</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map((user,i) => User(i,user))}
                                </tbody>
                            </Table>
                        </TabPane>
                        <TabPane tabId="2">
                                <CreateForm></CreateForm>
                        </TabPane>
                    </TabContent>
                </Card>
            </div>
        );
    }
}

export default UsersView;