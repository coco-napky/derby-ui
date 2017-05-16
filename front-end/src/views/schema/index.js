import React, {Component} from 'react';
import QueryService from '../../services/query';
import { Card, CardBlock, CardTitle, ListGroup, ListGroupItem  } from 'reactstrap';
import CreateForm from './create';
import "./style.scss";

class SchemaDetails extends Component {
    state = {  }

    constructor(props) {
        super(props);
        this.loadData();
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
                        </ListGroup>
                    </CardBlock>
                    <CardBlock>
                        <CardTitle>Create Schema</CardTitle>
                        <CreateForm>
                        </CreateForm>
                    </CardBlock>
                </Card>
            </div>
        );
    }
}

export default SchemaDetails;