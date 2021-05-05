import React from "react";
import "./Header.css";


class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        logged_in: !!localStorage.getItem('token'),
        search: "",
        username: localStorage.getItem("username"),
        name: localStorage.getItem("name"),
        avatar: localStorage.getItem("avatar"),
    }
  }

    nav() {
        return(
            <div>
            <ul>
            <ul className={"nav"}>
                <li><a href={"/login"}>login</a></li>
                <li><a href={"/signup"}>signup</a></li>
            </ul>
        </ul>
        </div>);
    }
    handle_logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('avatar');
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        this.setState({ logged_in: false, username: '', name: '', avatar: '' });
    };

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('/api/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({ username: json.username, avatar: json.avatar, name: json.name, });
                });

        }
    }

    render() {
        const logged_in_nav = (
            <div>
                <ul>
            <ul className={"nav"}>
                <li><a href={"/add"}   className={"gradient-button"}>add post</a></li>
                <li><a href={"profile"}>{this.state.username}</a></li>
                <li onClick={this.handle_logout}>logout</li>
            </ul>
                </ul>
            </div>
        );
        return (
            <div className="header">
                <div className="brand">
                    <a href={"/"}> <img src="http://localhost:443/icon.jpg" className="logo" alt="Rgarm" /></a>
                    <h3>Rgram</h3>
                    <input type="text" name="search" value={this.props.search} placeholder="Search" className="search_url" />
                </div>
                {this.state.logged_in ? logged_in_nav : this.nav()}
            </div>
        );
    }
}

export default Header;
