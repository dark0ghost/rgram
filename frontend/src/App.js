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
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: ''
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({ username: json.username });
                });
        }
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.user.username
                });
            });
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/core/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.username
                });
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
    };

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };


  render() {
      let form;
      switch (this.state.displayed_form) {
          case 'login':
              form = <LoginForm handle_login={this.handle_login} />;
              break;
          case 'signup':
              form = <SignupForm handle_signup={this.handle_signup} />;
              break;
          default:
              form = null;
      }
    const loader = "http://localhost:443/loader.gif";
    return (
      <Router>
        <div>
          <Header />
          {this.props.getPostReducer.loading && <div className="loader-div"><img src={loader} className="loader" /></div> }
          {this.props.addPostReducer.loading && <div className="loader-div"><img src={loader} className="loader" /></div> }
            {form}
            <Route exact path="/add" component={AddPost} />
            <Route exact path="/" component={PostFeed} />
            <Route exact path="/register" component={SignupForm} />
            <Route exact path="/register" component={LoginForm} />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
}
export default connect(mapStateToProps)(App);

