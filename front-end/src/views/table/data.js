import React, {Component} from 'react';
import { Table } from 'reactstrap';

const mapRow = (i,columns, row) =>{
    return (
    <tr key={i}>
        <th key={i}>{i} </th>
        {columns.map((c,i) => (
            <td>{`${row[c.columnName.toLowerCase()]}`}</td>
        ))}
    </tr>
);
} 

class TableData extends Component {
    
    constructor(props) {
        super(props);
        this.props = {...this.props,columns: [], rows: []}
    }
    
    render() {
        console.log(this.props)
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        {!this.props.columns ? "" : this.props.columns.map((c,i) => (
                            <th key={i}> {c.columnName}  </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!(this.props.rows) ? "" : this.props.rows.map((r,i) => mapRow(i,this.props.columns,r))}
                </tbody>
            </Table>
        );
    }
}

export default TableData;