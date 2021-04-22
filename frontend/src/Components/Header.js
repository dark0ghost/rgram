import React from "react";

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        logged_in: !!localStorage.getItem('token'),
        search: "",
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
        this.setState({ logged_in: false, username: '' });
    };

  render() {
      const logged_in_nav = (
          <ul>
              <li>{this.state.username}</li>
              <li onClick={this.handle_logout}>logout</li>
          </ul>
      );
    return (
      <div className="header">
        <div className="brand">
            <a href={"/"}> <img src="http://localhost:443/icon.jpg" className="logo" alt="Brand" /></a>
          <h3>Rgram</h3>
          <input type="text" name="search" value={this.props.search} placeholder="Search" className="search_url" />
        </div>
          {this.state.logged_in ? logged_in_nav : this.nav()}
      </div>
    );
  }
}

export default Header;
