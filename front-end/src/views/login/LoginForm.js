import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class LoginForm extends Component {
    state = {  }
    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="user">User</Label>
                    <Input type="text" name="user" id="user"/>
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password"/>
                </FormGroup>

                <FormGroup>
                    <Label for="database9">Database</Label>
                    <Input type="select" name="select" id="database">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>

                <Button>Submit</Button>
            </Form>
        );
    }
}

export default LoginForm;