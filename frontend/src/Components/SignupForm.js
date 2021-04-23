import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class SignupForm extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',
        name: '',
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
        const form = e.target;
        e.preventDefault();
        fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                console.log(Object.keys(json).length)
                console.log(json)
                if(Object.keys(json).length){
                localStorage.setItem('token', json.token);
                localStorage.setItem('username', json.name);
                this.setState({
                    logged_in: true,
                    name: json.name,
                    username: json.username
                });
                return
                }
                this.setState({
                    logged_in: false,
                })
                alert("auth failed")
            });
        form.reset();
    };


    render() {
        return (
            <form onSubmit={e => this.handle_signup(e, this.state)}>
                <h4>Sign Up</h4>
                <label htmlFor="name">Username</label>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handle_change}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handle_change}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handle_change}
                />
                <label htmlFor="username">Short name </label>
                <input
                    type="username"
                    name="username"
                    value={this.state.username}
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
