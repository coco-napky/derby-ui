import React, {Component} from 'react';
import { Card, CardBlock, CardTitle, CardText, CardSubtitle, ListGroup, ListGroupItem, Button } from 'reactstrap';

class Detail extends Component {
    render() {
        return (
            <Card>
                <CardBlock>
                    <CardTitle>{this.props.data.identifier}</CardTitle>
                    <CardSubtitle className="mt-3 mb-3">Table Properties</CardSubtitle>
                    <ListGroup>
                        <ListGroupItem>Schema Id: {this.props.data.schemaId}</ListGroupItem>
                        <ListGroupItem>Table Id: {this.props.data.tableId}</ListGroupItem>
                    </ListGroup>
                    <CardSubtitle className="mt-3 mb-3">Columns</CardSubtitle>
                    <ListGroup>
                        {!this.props.data.columns ? "" : this.props.data.columns.map((c,i) => (
                            <ListGroupItem key={i}>{c.columnName} : {c.columnDataType}</ListGroupItem>
                        ))}
                    </ListGroup>
                    <CardSubtitle className="mt-3 mb-3">DDL</CardSubtitle>
                    <hr/>
                    <CardText>
                        CREATE TABLE ( 
                        <br/>
                            {!this.props.data.columns ?
                                "" : this.props.data.columns.map((c,i) => (
                                <span key={i} className="d-block pl-3">{` "${c.columnName}" ${c.columnDataType}, `}</span> 
                            ))}
                         )
                    </CardText>
                    <hr/>
                    <div className="d-flex w-100 justify-content-center">
                        <Button className="w-50" color="danger">Eliminar</Button>{' '}
                    </div>
                </CardBlock>
            </Card>
        );
    }
}

export default Detail;