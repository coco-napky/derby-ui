import React, {Component} from 'react';
import QueryService from '../../services/query';
import { Card, CardBlock, CardTitle, CardSubtitle, ListGroup, ListGroupItem  } from 'reactstrap';
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
            <div key={this.props.location.key} className="d-flex pt-5 justify-content-center w-100 vw-schema-detail">
                 <Card>
                    <CardBlock>
                        <CardTitle>{this.state.schemaname}</CardTitle>
                        <ListGroup>
                            <ListGroupItem>Schema Id: {this.state.authorizationid}</ListGroupItem>
                            <ListGroupItem>Table Id: {this.state.schemaid}</ListGroupItem>
                        </ListGroup>
                    </CardBlock>
                </Card>
            </div>
        );
    }
}

export default SchemaDetails;