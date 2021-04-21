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

  render() {
    return (
      <div className="header">
        <div className="brand">
          <img src="http://localhost:443/icon.jpg" className="logo" alt="Brand" />
          <h3>Rgram</h3>
          <input type="text" name="search" value={this.props.search} placeholder="Search" className="search_url" />
        </div>
          {this.state.logged_in ? this.state.username : this.nav()}
      </div>
    );
  }
}

export default Header;
