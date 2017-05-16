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
                        <ListGroupItem>Conglomerate Id: {data.conglomerateid}</ListGroupItem>
                        <ListGroupItem>Conglomerate Number: {data.conglomeratenumber}</ListGroupItem>
                        <ListGroupItem>Is Constraint: {data.isconstraint + ''}</ListGroupItem>
                        <ListGroupItem>Is Index: {data.isindex + ''}</ListGroupItem>
                        <ListGroupItem>Schema Id: {data.schemaid}</ListGroupItem>
                        <ListGroupItem>Table Id: {data.tableid}</ListGroupItem>
                    </ListGroup>
                </CardBlock>
            </Card>            
        );
    }
}

export default Details;