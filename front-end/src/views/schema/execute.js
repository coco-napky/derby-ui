import React, {Component} from 'react';
import QueryService from '../../services/query';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';

class ExecuteQueryForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const {sql} = this;
        QueryService.execute(sql);
    }

    render() {
        return (
            <Card className="card-create pl-5 pr-5 pb-2 pt-2 w-100">
                <Form>
                    <FormGroup>
                        <Label for="sql">SQL</Label>
                        <Input type="text" name="sql" id="sql" onChange={e => this.sql = e.target.value}/>
                    </FormGroup>
                    <Button onClick={e => this.handleSubmit()}>Submit</Button>
                </Form>
            </Card>
        );
    }
}

export default ExecuteQueryForm;