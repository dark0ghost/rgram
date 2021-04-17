import { createStore, combineReducers, applyMiddleware } from 'redux';
import { addPostReducer } from '../state/addPostState/addState.js';
import { getPostReducer } from '../state/addPostState/getState.js';
import thunk from 'redux-thunk';

const Store = createStore(combineReducers({
    addPostReducer,
    getPostReducer
}),applyMiddleware(thunk));

export default Store;