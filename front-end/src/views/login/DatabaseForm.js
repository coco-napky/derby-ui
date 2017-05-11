import React, {Component} from 'react';
import { Alert, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DatabaseService from '../../services/database';

class DatabaseForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {databases: [], error: false, response: false, message: ''}

        DatabaseService.getDatabases()
        .then(response => this.setState({...this.state, databases: response.data.data}))
    }

    handleSubmit() {
        DatabaseService.createDatabase(this.name)
        .then(response => {
            this.setState({
                ...this.state,
                error: !response.data.status,
                response: true,
                message: response.data.status ? response.data.message : "Error creating database"
            })
            return DatabaseService.getDatabases()
        })
        .then(response => this.setState({...this.state, databases: response.data.data}))
        .catch(error => this.setState({
            ...this.state,
            error: true,
            response: true,
            message: "Error creating database"
        }))   
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="name">Database Name</Label>
                    <Input type="text" name="name" id="name" onChange={e => this.name = e.target.value}/>
                </FormGroup>
                <FormGroup>
                    <Label for="database">Database List</Label>
                    <Input type="select" name="select" id="database">
                        {this.state.databases.map(database => (
                            <option>{database}</option>
                        ))}
                    </Input>
                </FormGroup>                
                <Button onClick={n => this.handleSubmit()}>Submit</Button>
                {
                    this.state.response ? 
                    <Alert className="mt-3" color={this.state.error ? "danger" : "success"}>
                        {this.state.message}
                    </Alert> : ""
                }
            </Form>
        );
    }
}

export default DatabaseForm;