import React, {Component} from 'react';
import { Table } from 'reactstrap';

const mapRow = (i,columns, row) =>{
    return (
    <tr key={i}>
        <th key={i}>{i} </th>
        {columns.map((c,i) => (
            <td key={i}>{`${row[c.columnName.toLowerCase()]}`}</td>
        ))}
    </tr>
);
} 

class TableData extends Component {
    render() {
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