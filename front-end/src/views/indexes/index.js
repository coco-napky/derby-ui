import React, {Component} from 'react';
import QueryService from '../../services/query';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card} from 'reactstrap';
import classnames from 'classnames';
import IndexDetails from './details';

class IndexesView extends Component {

    constructor(props) {
        super(props);
        this.state = {index: {}, activeTab: '1',}
        this.loadData();
        this.toggle = this.toggle.bind(this);
    }

    componentWillReceiveProps() {
        this.loadData();
    }

    loadData() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        
        this.name = id;
        QueryService.queryTable('sys', 'SYSCONGLOMERATES', 'CONGLOMERATEID', id)
         .then(response => {
            this.setState({...this.state, index: response.data.data.myArrayList[0].map})
        })
        .catch(error => console.log(error))
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) 
            this.setState({ activeTab: tab});
    }    

    render() {
        return (
        <div className="w-100 d-flex justify-content-center vw-table">
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
                                
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="pt-2">
                        <TabPane tabId="1">
                            <IndexDetails data={this.state.index}/>
                        </TabPane>
                        <TabPane tabId="2">
                            <h2>Create</h2>
                        </TabPane>
                    </TabContent>
                </Card>
            </div>        
        );
    }
}

export default IndexesView;