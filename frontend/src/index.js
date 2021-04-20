import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { addPostReducer } from './Reducers/addPostReducer';
import { getPostReducer } from './Reducers/getPostReducer';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    addPostReducer,
    getPostReducer
}),applyMiddleware(thunk));

export default store;


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);