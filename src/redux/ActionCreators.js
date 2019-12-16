import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// All Orders

// Redux Thunk
export const getOrdersList = () => (dispatch) => {

    // Send status that list is loading

    return fetch(baseUrl)
        .then(response => {
            if (response.ok){
                return response;
            }
            else{
                // Error is handled in case of when server responds but with errors
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(ordersList => {
            // var index = 0
            // for(var order of ordersList){
            //     order["id"] = index
            //     index++
            // }
            dispatch(addOrders(ordersList["orders"]))
            dispatch(nextOrders())
        })
        .catch(error => dispatch(ordersListFailed(error.message)))
}


export const searchOrdersListByText = (text) => (dispatch, getState) => {

    // Send status that list is loading
    
    var ordersList = getState().ordersList.all;
    var displayOrdersList = []

    var queriedOrdersList = ordersList.filter(order => {
        //console.log(order)
        if (order["deliveryPincode"].toString().indexOf(text.toString()) > -1 || order["orderDate"].toString().indexOf(text.toString()) > -1){
            //console.log('true')
            return true;
        }
        //console.log('false')
        return false;
    })

    dispatch(addQueriedOrders(queriedOrdersList, text));
    displayOrdersList = queriedOrdersList.slice(0, 10)
    dispatch(addDisplayOrders(displayOrdersList, 10))
}


export const sortQueriedOrders = (sortOrder) => (dispatch, getState) => {

    //console.log("Sorting...")

    var queriedOrdersList = getState().ordersList.queried;
    var query = getState().ordersList.query;
    // var currentIndex = getState().ordersList.currentIndex;
    var displayOrdersList = []
    
    // Ascending order
    //if(sortOrder)
        queriedOrdersList.sort((order1, order2) => { return parseInt(convertDateStringToShortDateForm(order1.orderDate).getTime()) - parseInt(convertDateStringToShortDateForm(order2.orderDate).getTime()) })
    //else
        //queriedOrdersList.sort((order1, order2) => { return parseInt(convertDateStringToShortDateForm(order2.orderDate).getTime()) - parseInt(convertDateStringToShortDateForm(order1.orderDate).getTime()) })

    dispatch(addQueriedOrders(queriedOrdersList, query))
    displayOrdersList = queriedOrdersList.slice(0, 10)
    dispatch(addDisplayOrders(displayOrdersList, 10))
}


export const nextOrders = () => (dispatch, getState) => {

    var currentIndex = getState().ordersList.currentIndex;
    var queriedOrdersList = getState().ordersList.queried;
    var displayOrdersList = []

    var maxQueriedOrdersListLength = queriedOrdersList.length

    if((currentIndex+10) > maxQueriedOrdersListLength && currentIndex < maxQueriedOrdersListLength){
        displayOrdersList = queriedOrdersList.slice(currentIndex, maxQueriedOrdersListLength)
        dispatch(addDisplayOrders(displayOrdersList, maxQueriedOrdersListLength))
    } else if( (currentIndex+10) < maxQueriedOrdersListLength) {
        displayOrdersList = queriedOrdersList.slice(currentIndex, currentIndex+10)
        dispatch(addDisplayOrders(displayOrdersList, currentIndex+10))
    }
}

export const prevOrders = () => (dispatch, getState) => {
    var currentIndex = getState().ordersList.currentIndex;
    var queriedOrdersList = getState().ordersList.queried;
    var displayOrdersList = []

    var minQueriedOrdersListLength = 0

    if((currentIndex-10) < minQueriedOrdersListLength && currentIndex > minQueriedOrdersListLength){
        displayOrdersList = queriedOrdersList.slice(minQueriedOrdersListLength, currentIndex)
        dispatch(addDisplayOrders(displayOrdersList, minQueriedOrdersListLength))
    } else if( (currentIndex-10) > minQueriedOrdersListLength) {
        displayOrdersList = queriedOrdersList.slice(currentIndex-10, currentIndex)
        dispatch(addDisplayOrders(displayOrdersList, currentIndex-10))
    }
}


const convertDateStringToShortDateForm = (dateString) => {
    // Convert dd/mm/yyyy to mm/dd/yyyy
    var dateParts = dateString.split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 

    return dateObject
}


// Action creators

export const ordersListLoading = () => ({
    type: ActionTypes.ORDERS_LIST_LOADING
});

export const addOrders = (ordersList) => ({
    type: ActionTypes.ADD_ORDERS,
    payload: ordersList
});

export const addQueriedOrders = (ordersList, text) => ({
    type: ActionTypes.ADD_QUERIED_ORDERS,
    payload: {
        ordersList: ordersList,
        query: text
    }
});

export const addDisplayOrders = (ordersList, currentIndex) => ({
    type: ActionTypes.ADD_DISPLAY_ORDERS,
    payload: {
        ordersList: ordersList,
        currentIndex: currentIndex
    }
});

export const ordersListFailed = (errMess) => ({
    type: ActionTypes.ORDERS_LIST_FAILED,
    payload: errMess
});

