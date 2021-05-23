import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class SignupForm extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',
        name: '',
        image: '',
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
                console.log(json)
                if(Object.keys(json).length){
                localStorage.setItem('token', json.token);
                localStorage.setItem('avatar', json.avatar);
                this.setState({
                    logged_in: true,
                    name: json.name,
                    username: json.username
                });
                window.location = "/"
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

        <div id="wrapper">
            <div className ="main-content">
                <div className ="l-part">
                    <form onSubmit={e => this.handle_signup(e, this.state)}>
                        <h4>Sign Up</h4>
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handle_change}
                            placeholder="Username"
                            className="input-1"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handle_change}
                            placeholder="Password"
                            className="input-2"
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handle_change}
                            placeholder="email"
                            className="input-1"
                        />
                        <label htmlFor="username">Short name </label>
                        <input
                            type="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handle_change}
                            placeholder="short name"
                            className="input-1"
                        />
                        <input type="submit" value="Sing Up" className="btn" />
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default withRouter(connect(mapStateToProps)(SignupForm));
