'use strict';
import './App.css';
import React from "react";
import Header from './MainMenu/Header';
import AddPost from './MainMenu/AddPosts';
import PostFeed from './comments/Feed';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import mapStateToProps from "./State";


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          {this.props.getPostReducer.loading && <div className="loader-div"><img src="https://raw.githubusercontent.com/saurabh216/Instagram-React/master/src/Images/loader.gif" className="loader"  alt="slow connection"/></div> }
          {this.props.addPostReducer.loading && <div className="loader-div"><img src="https://raw.githubusercontent.com/saurabh216/Instagram-React/master/src/Images/loader.gif" className="loader" alt="slow connection" /></div> }
          <Route exact path="/" component={PostFeed} />
          <Route exact path="/add" component={AddPost} />
        </div>
      </Router>
    );
  }
}



export default connect(mapStateToProps)(App);
