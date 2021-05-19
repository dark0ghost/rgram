import React, { Component } from "react";
import "./App.css";
import Header from './Components/Header';
import AddPost from './Components/AddPost';
import PostFeed from './Components/PostFeed/PostFeed';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginUserForm";
import Tag from "./Components/PostFeed/Tag";
import Profile from "./Components/Profile";
import Comment from "./Components/PostFeed/Comment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: !!localStorage.getItem('token'),
      username: ''
    };
  }

  render() {
    const loader = "http://localhost:8000/templates/loader.gif";
    return (
      <Router>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div>
          <Header />
          {this.props.getPostReducer.loading && <div className="loader-div"><img src={loader} className="loader"  alt="loader" /></div> }
          {this.props.addPostReducer.loading && <div className="loader-div"><img src={loader} className="loader"  alt="loader" /></div> }
            <Route exact path="/add" component={AddPost} />
            <Route exact path="/" component={PostFeed} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/login"  component={LoginForm} />
            <Route exact path="/tags/:name" component={Tag} />
            <Route exact path="/profile"  component={Profile} />
            <Route exact path="/comments/:name" component={Comment} />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
}
export default connect(mapStateToProps)(App);

