import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { OrdersList } from './orders';



export const Store = () =>{
    const store =  createStore(
        combineReducers({
            ordersList: OrdersList,
            // ...createForms({
                
            // })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
