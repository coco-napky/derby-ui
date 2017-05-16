import React, {Component} from 'react';
import QueryService from '../../services/query';
import { Card, CardBlock, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import CreateForm from './create';
import CreateTableForm from './createTable';
import ExcuteQueryForm from './execute';
import "./style.scss";

class SchemaDetails extends Component {
    state = {  }

    constructor(props) {
        super(props);
        this.dropSchema = this.dropSchema.bind(this);
        this.loadData();
    }

    dropSchema() {
        let {schemaname} = this.state;        
        QueryService.execute(`DROP SCHEMA ${schemaname} RESTRICT`)
        .then(response => console.log(response.data));
    }

    loadData() {
        let {schemaName} = this.props.match.params;        
        QueryService.queryTable('sys', 'sysschemas', 'schemaName', schemaName)
        .then(response => {
            let schema = response.data.data.myArrayList[0].map
            this.setState({...this.state, ...schema});
        })
    }

    componentWillReceiveProps() {
        this.loadData();
    }

    componentWillUpdate() {
        let {schemaName} = this.props.match.params;        
        if(this.state.schemaname !== schemaName)
            this.loadData();
    }

    render() {
        return (
            <div key={this.props.location.key} className="d-flex justify-content-center w-100 vw-schema-detail">
                 <Card className="w-100 h-100">
                    <CardBlock>
                        <CardTitle>{this.state.schemaname}</CardTitle>
                        <ListGroup>
                            <ListGroupItem>Schema Id: {this.state.authorizationid}</ListGroupItem>
                            <ListGroupItem>Table Id: {this.state.schemaid}</ListGroupItem>
                            <ListGroupItem>DDL: CREATE SCHEMA {this.state.schemaname}</ListGroupItem>
                        </ListGroup>
                        <div className="pt-3 d-flex w-100 justify-content-center">
                            <Button className="w-50" color="danger" onClick={() => this.dropSchema()}>Eliminar</Button>{' '}
                        </div>
                    </CardBlock>
                    <CardBlock>
                        <CardTitle>Execute SQL</CardTitle>
                        <ExcuteQueryForm/>
                    </CardBlock>                    
                    <CardBlock>
                        <CardTitle>Create Schema</CardTitle>
                        <CreateForm>
                        </CreateForm>
                    </CardBlock>
                    <CardBlock>
                        <CardTitle>Create Table</CardTitle>
                        <CreateTableForm schema={this.state.schemaname}/>
                    </CardBlock>
                </Card>
            </div>
        );
    }
}

export default SchemaDetails;