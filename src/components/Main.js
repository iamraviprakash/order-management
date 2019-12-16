import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Grid from '@material-ui/core/Grid';
import { getOrdersList, searchOrdersListByText, sortQueriedOrders, nextOrders, prevOrders } from '../redux/ActionCreators';
import '../shared/style.css';
// import Sidebar from './Sidebar';
import RightSurface from './RightSurface';
import { Container } from '@material-ui/core';


const mapStateToProps = state => {
    return {
        "ordersList": {...state["ordersList"]}, 
    };
}

const mapDispatchToProps = (dispatch) => ({
    getOrdersList: () => {dispatch(getOrdersList())},
    sortQueriedOrders: (order) => {dispatch(sortQueriedOrders(order))},
    searchOrdersListByText: (text) => {dispatch(searchOrdersListByText(text))},
    nextOrders: () => {dispatch(nextOrders())},
    prevOrders: () => {dispatch(prevOrders())},
});


class Main extends Component{

    componentDidMount() {
        this.props.getOrdersList();
    }
    
    render(){
        return(
            <Container className="h-100">
                {/* <Grid xs={1} >
                    <Sidebar sortQueriedOrders={(order) => this.props.sortQueriedOrders(order)}/>
                </Grid> */}
                <RightSurface 
                            searchOrdersListByText={(text) => this.props.searchOrdersListByText(text)}
                            ordersList={this.props.ordersList} 
                            sortQueriedOrders={(order) => this.props.sortQueriedOrders(order)}
                            prevOrders={() => this.props.prevOrders()}
                            nextOrders={() => this.props.nextOrders()}
                        />    
            </Container>
        );
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));