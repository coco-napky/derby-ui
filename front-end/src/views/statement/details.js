import React, {Component} from 'react';
import { Card, CardBlock, CardTitle, ListGroup, ListGroupItem  } from 'reactstrap';

class Details extends Component {
    
    state = {};

    render() {
        const {data} = this.props;
        return (
            <Card>
                <CardBlock>
                    <CardTitle>{data.stmtname}</CardTitle>
                    <ListGroup>
                        <ListGroupItem>Statement Id: {data.stmtid}</ListGroupItem>
                        <ListGroupItem>Schema Id: {data.schemaid}</ListGroupItem>
                        <ListGroupItem>Compilation Schema Id: {data.compilationschemaid}</ListGroupItem>
                        <ListGroupItem>Type: {data.type}</ListGroupItem>
                        <ListGroupItem>Using Text: {data.usingtext}</ListGroupItem>
                        <ListGroupItem>Valid: {data.valid}</ListGroupItem>
                        <ListGroupItem>Last Compiled: {data.lastcompiled}</ListGroupItem>
                        <ListGroupItem>Using Text: {data.usingtext}</ListGroupItem>
                        <ListGroupItem>Text: {data.text}</ListGroupItem>
                    </ListGroup>
                </CardBlock>
            </Card>            
        );
    }
}

export default Details;