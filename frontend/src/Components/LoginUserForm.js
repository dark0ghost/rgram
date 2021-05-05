import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React from 'react';

class LoginForm extends React.Component {
    state = {
        username: '',
        password: '',
        profile_photo: '',
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

    handle_login = (e, data) => {
        e.preventDefault();
        const form = e.target;
        fetch('/api/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res =>res.json())
            .then(json => {
                console.log(json)
                try {
                    this.setState({
                        logged_in: true,
                        username: json.user.username,
                        profile_photo: json.user.avatar,
                    });
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('avatar', json.user.avatar);
                    window.location = "/"
                    return
                }catch (e) {
                    alert(json.non_field_errors[0])
                }
            });
        form.reset();
    };

    render() {
        return (
            <form onSubmit={e => this.handle_login(e, this.state)}>
                <h4>Log In</h4>
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
export default withRouter(connect(mapStateToProps)(LoginForm));