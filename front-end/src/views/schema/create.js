import React, {Component} from 'react';
import QueryService from '../../services/query';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const {name} = this;
        QueryService.createSchema(name);
    }

    render() {
        return (
            <Card className="card-create pl-5 pr-5 pb-2 pt-2 w-100">
                <Form>
                    <FormGroup>
                        <Label for="name">Schema Name</Label>
                        <Input type="text" name="name" id="name" onChange={e => this.name = e.target.value}/>
                    </FormGroup>
                    <Button onClick={e => this.handleSubmit()}>Submit</Button>
                </Form>
            </Card>
        );
    }
}

export default CreateForm;