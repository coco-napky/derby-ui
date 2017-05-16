import React, {Component} from 'react';
import QueryService from '../../services/query';
import { Button, Form, FormGroup, Label, Input, Card, CardBlock } from 'reactstrap';

class CreateTableForm extends Component {
    constructor(props) {
        super(props);
        this.handleCreateTable = this.handleCreateTable.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.columns = [];
        this.state = {columns: []}
        this.datatype = 'INTEGER';
        this.name = '';
        this.columnName = '';
        this.primaryKey = '';
    }

    handleCreateTable() {
        const {ddl} = this.state;
        console.log('this is the fucking ddl', ddl);
        QueryService.execute(ddl);
        this.columns = [];
        
    }

    generateDDL() {
        let ddl = `CREATE TABLE ${this.props.schema}.${this.name.toUpperCase()}`;
        ddl += '\n(\n';

        for(let i = 0; i < this.columns.length; ++i) {
            ddl += '\t' + this.columns[i];

            if(i !== this.columns.length - 1)
                ddl += ',';
            ddl += '\n';
        }
        
        if(this.primaryKey.length > 0)
            ddl += '\t' + `,PRIMARY KEY (${this.primaryKey})` + '\n';
        ddl += ')';
        this.setState({...this.state, ddl: ddl.toUpperCase()});
    }

    addColumn() {
        let {columnName, datatype, length, scale, notNull} = this;

        let columnDDL = `${columnName} ${datatype}`;

        if(datatype !== 'INTEGER' && datatype !== 'DATE') {
            if(datatype === 'DECIMAL') {
                columnDDL += `(${length},${scale})`;
            }else {
                columnDDL += `(${length})`;
            }
        }

        if(notNull)
            columnDDL += " NOT NULL";
        
        this.columns.push(columnDDL);
        this.setState({...this.state, columns: [...this.state.columns, columnDDL]})
        this.generateDDL();
    }

    render() {
        return (
            <Card className="card-create pl-5 pr-5 pb-2 pt-2 w-100">
                <Form>
                    <FormGroup>
                        <Label for="name">Table Name</Label>
                        <Input type="text" name="name" id="name" onChange={e => this.name = e.target.value}/>

                        <Label className="mt-2" for="primary-key">Primary Key</Label>
                        <Input type="text" name="primary-key" id="primary-key"
                                onChange={e => this.primaryKey = e.target.value}/>     
                    </FormGroup>
                    <Card className="w-100 mb-3">
                        <CardBlock>
                            <FormGroup>
                                <Label for="column-name">Column Name</Label>
                                <Input type="text" name="column-name" id="column-name"
                                     onChange={e => this.columnName = e.target.value}/>

                                <Label className="mt-2" for="column-name">Data Type</Label>                                     
                                <Input type="select" name="select" id="type"
                                    onChange={e => this.datatype = e.target.value}>
                                    <option>INTEGER</option>
                                    <option>VARCHAR</option>
                                    <option>DECIMAL</option>
                                    <option>DATE</option>
                                </Input>

                                <Label className="mt-2" for="length">Length Or Precision</Label>
                                <Input type="number" name="length" id="length"
                                    onChange={e => this.length = e.target.value}>
                                </Input> 

                                <Label className="mt-2" for="scale">Scale</Label>
                                <Input type="number" name="scale" id="scale"
                                    onChange={e => this.scale = e.target.value}>
                                </Input>  
                                
                                <div className="">
                                    <Label className="mt-3" for="not-null">Not Null</Label>
                                    <div className="d-inline-block">
                                        <Input className="ml-2" type="checkbox" name="not-null" id="not-null"
                                            onChange={e => this.notNull = e.target.value}/>
                                    </div>
                                </div>
                                
                                <Label for="ddl">DDL</Label>
                                <Input type="textarea" name="ddl" id="ddl" value={this.state.ddl} disabled/>                                                                      
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-center">
                                <Button color="info" onClick={e => this.addColumn()} 
                                    className="w-25"> Add Column </Button>
                            </FormGroup>
                        </CardBlock>
                    </Card>
                    <Button onClick={e => this.handleCreateTable()}>Submit</Button>
                </Form>
            </Card>
        );
    }
}

export default CreateTableForm;