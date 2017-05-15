import React, {Component} from 'react';
import QueryService from '../../services/query';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Table } from 'reactstrap';
import classnames from 'classnames';
import Details from './details';
import TableData from './data';
import "./style.scss";

class TableView extends Component {
    constructor(props) {
        super(props);
            this.state = {
                activeTab: '1',
                tableDetails: {columns: []},
                tableData: []
            };
        this.loadData();
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) 
            this.setState({ activeTab: tab});
    }

    loadData() {
        let {schemaName} = this.props.match.params;        
        
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const name = params.get('name');
        const tableName = name.split('.')[1];
        const schema = params.get('schema');

        this.name = name;
        QueryService.getTables("tablename", tableName)
         .then(response => {
            this.setState({...this.state, tableDetails: response.data.data[name]});
            return QueryService.queryTable(schema, tableName)
        })
        .then(response => {
            let tableData = response.data.data.myArrayList.map(t => t.map);
            this.setState({...this.state, tableData});
        })
        .catch(error => console.error(error))
    }

    componentWillReceiveProps() {
        this.loadData();
    }

    componentWillUpdate() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const name = params.get('name');
        
        if(this.name !== name)
            this.loadData();
    }

    render() {
        return (
            <div className="w-100 pt-5 d-flex justify-content-center vw-table">
            <Card className="main-card">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}>
                            Details
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}>
                            Rows
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} className="pt-2">
                    <TabPane tabId="1">
                        <Details data={{...this.state.tableDetails}}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <TableData columns={this.state.tableDetails.columns} rows={this.state.tableData}/>
                    </TabPane>
                </TabContent>
            </Card>
            </div>
        );
    }
}

export default TableView;