import React, { Component } from "react";
import "./App.css";
import Header from './Components/Header';
import AddPost from './Components/AddPost';
import PostFeed from './Components/PostFeed/PostFeed';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginUserForm";

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
        <div>
          <Header/>
          {this.props.getPostReducer.loading && <div className="loader-div"><img src={loader} className="loader"  alt="loader" /></div> }
          {this.props.addPostReducer.loading && <div className="loader-div"><img src={loader} className="loader"  alt="loader" /></div> }
            <Route exact path="/add" component={AddPost} />
            <Route exact path="/" component={PostFeed} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/login"  component={LoginForm} />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
}
export default connect(mapStateToProps)(App);

