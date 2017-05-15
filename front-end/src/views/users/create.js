import React, {Component} from 'react';
import UserService from '../../services/user';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const {user, password} = this;
        UserService.createUser(user, password);
    }

    render() {
        return (
            <Card className="card-create pl-5 pr-5 pb-2 pt-2">
                <Form>
                    <FormGroup>
                        <Label for="user">User</Label>
                        <Input type="text" name="user" id="user" onChange={e => this.user = e.target.value}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="text" name="password" id="password" onChange={e => this.password = e.target.value}/>
                    </FormGroup>
                    <Button onClick={e => this.handleSubmit()}>Submit</Button>
                </Form>
            </Card>
        );
    }
}

export default CreateForm;