import React, {Component} from 'react';
import { Card, CardBlock, CardTitle, ListGroup, ListGroupItem  } from 'reactstrap';

class Details extends Component {
    
    state = {};

    render() {
        const {data} = this.props;
        return (
            <Card>
                <CardBlock>
                    <CardTitle>{data.constraintname}</CardTitle>
                    <ListGroup>
                        <ListGroupItem>Constraint Id: {data.constraintid}</ListGroupItem>
                        <ListGroupItem>Reference Count: {data.referencecount + ''}</ListGroupItem>
                        <ListGroupItem>State: {data.state}</ListGroupItem>
                        <ListGroupItem>Schema Id: {data.schemaid}</ListGroupItem>
                        <ListGroupItem>Table Id: {data.tableid}</ListGroupItem>
                    </ListGroup>
                </CardBlock>
            </Card>            
        );
    }
}

export default Details;