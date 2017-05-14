import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatabaseService from '../../services/database';
import UserService from '../../services/user';
import SessionService from '../../services/session';
import EventService from '../../services/events';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {databases: [], error: false, response: false, message: ''}
        
        DatabaseService.getDatabases()
        .then(response => {
            this.setState({...this.state, databases: response.data.data});
            this.database = response.data.data[0];
        })
    }

    handleSubmit() {
        
        let {user,password,database} = this;
        UserService.login(database,user,password)
        .then(response => {
            if(response.data.status) {
                SessionService.setSession({user,password,database});
                EventService.emit("login");   
            }
        })
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="user">User</Label>
                    <Input type="text" name="user" id="user" onChange={e => this.user = e.target.value}/>
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" onChange={e => this.password = e.target.value}/>
                </FormGroup>

                <FormGroup>
                    <Label for="database9">Database</Label>
                    <Input type="select" name="select" id="database" onChange={e => this.database = e.target.value}>
                        {this.state.databases.map((database, index) => (
                            <option key={index}>{database}</option>
                        ))}
                    </Input>
                </FormGroup>
                <Button onClick={e => this.handleSubmit()}>Submit</Button>
            </Form>
        );
    }
}

export default LoginForm;