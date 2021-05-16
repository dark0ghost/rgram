import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React from 'react';
import  "./Login.css";

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
                console.log(json.id);
                try {
                    this.setState({
                        logged_in: true,
                        username: json.user.username,
                        profile_photo: json.user.avatar,
                    });
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('avatar', json.user.avatar);
                    localStorage.setItem('username', json.user.username);
                    localStorage.setItem('id_user', json.user.id);
                    window.location = "/"

                }catch (e) {
                    alert(json.non_field_errors[0])
                }
            });
        form.reset();
    };

    render() {
        return (
            <div id="wrapper">
                <div className ="main-content">
                    <div className ="l-part">
                        <form onSubmit={e => this.handle_login(e, this.state)}>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handle_change}
                            placeholder="Username"
                            className="input-1" required={true}/>
                        <div className ="overlap-text">
                            <input type="password"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.handle_change}
                                   placeholder="Password"
                                   className ="input-2" required={true}/>
                            <a href="/">Forgot?</a>
                        </div>
                        <input type="submit" value="Log in" />
                        </form>
                    </div>
                </div>
                <div className="sub-content">
                    <div className="s-part">
                        Don't have an account?<a href="/signup">Sign up</a>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(LoginForm));