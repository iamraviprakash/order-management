import * as ActionTypes from './ActionTypes';

export const OrdersList = (state={
    isLoading: true,
    errMess: null,
    query: "",
    currentIndex: 0,
    all: [],
    queried: [],
    display: []
}, action) => {
    switch(action.type){
        case ActionTypes.ORDERS_LIST_LOADING:
            return {...state, isLoading: true, errMess: null, all: [], queried: [], display: []}
        case ActionTypes.ADD_ORDERS:
            return {...state, isLoading: false, errMess: null, all: action.payload, queried: action.payload}
        case ActionTypes.ADD_QUERIED_ORDERS:
                return {...state, queried: action.payload.ordersList, query: action.payload.query}
        case ActionTypes.ADD_DISPLAY_ORDERS:
            return {...state, currentIndex: action.payload.currentIndex, display: action.payload.ordersList}
        case ActionTypes.ORDERS_LIST_FAILED:
            return {...state, isLoading: false, errMess: action.payload, all: [], queried: []}        
        default: 
            return state;
    }
}