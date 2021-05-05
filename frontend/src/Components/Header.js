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
        const logged_out_nav = (
            <ul>
                <ul>
                    <li><a href={"/login"}>login</a></li>
                    <li><a href={"/signup"}>signup</a></li>
                </ul>
            </ul>
        );

        const logged_in_nav = (
            <ul>
                <li><a href={"/logout"}>logout</a></li>
            </ul>
        );
        return <div>{this.props.logged_in ? logged_in_nav : logged_out_nav}</div>;
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
          <ul className={"nav"}>
              <li><a href={"/add"} className={"gradient-button"}>add post</a></li>
              <li onClick={this.handle_logout}>logout</li>
              <li><a href={"profile"}>{this.state.username}</a></li>
              <li><img src={this.state.avatar} alt={"profile"}/></li>
          </ul>
      );
    return (
      <div className="header-nav">
        <div className="brand">
            <a href={"/"}> <img src="http://localhost:443/icon.jpg" className="logo" alt="Rgarm" /></a>
          <h3>Rgram</h3>
          <input type="text" name="search" value={this.props.search} placeholder="Search" className="search_url" />
           <div className={"right"}>  {this.state.logged_in ? logged_in_nav : this.nav()}</div>
        </div>
      </div>
    );
  }
}

export default Header;
