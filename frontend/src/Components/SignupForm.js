import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class SignupForm extends React.Component {
    state = {
        username: '',
        password: '',
        logged_in: !!localStorage.getItem('token'),
    };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        console.log(fetch('/api/users/', {
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
                    username: json.username
                });
            }).toString());
    };


    render() {
        return (
            <form onSubmit={e => this.handle_signup(e, this.state)}>
                <h4>Sign Up</h4>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handle_change}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handle_change}
                />
                <input type="submit" />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default withRouter(connect(mapStateToProps)(SignupForm));
