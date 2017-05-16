import React, {Component} from 'react';
import { Card, CardBlock, CardTitle, ListGroup, ListGroupItem  } from 'reactstrap';

class Details extends Component {
    
    state = {};

    render() {
        const {data} = this.props;
        return (
            <Card>
                <CardBlock>
                    <CardTitle>{data.triggername}</CardTitle>
                    <ListGroup>
                        <ListGroupItem>Trigger Id: {data.triggerid}</ListGroupItem>
                        <ListGroupItem>Action Statement Id: {data.actionstmtid}</ListGroupItem>
                        <ListGroupItem>Creation Timestamp: {data.creationtimestamp}</ListGroupItem>
                        <ListGroupItem>Event: {data.event}</ListGroupItem>
                        <ListGroupItem>Firing time: {data.firingtime}</ListGroupItem>
                        <ListGroupItem>Referencing New: {data.referencingnew + ''}</ListGroupItem>
                        <ListGroupItem>New Referencing Name: {data.newreferencingname}</ListGroupItem>
                        <ListGroupItem>Referencing Old: {data.referencingold + ''}</ListGroupItem>
                        <ListGroupItem>Old Referencing Name: {data.oldreferencingname}</ListGroupItem>     
                        <ListGroupItem>When Clause Text: {data.whenclausetext}</ListGroupItem>
                        <ListGroupItem>When Statement Id: {data.whenstmtid}</ListGroupItem>
                        <ListGroupItem>Schema Id: {data.schemaid}</ListGroupItem>
                        <ListGroupItem>Table Id: {data.tableid}</ListGroupItem>
                    </ListGroup>
                </CardBlock>
            </Card>            
        );
    }
}

export default Details;