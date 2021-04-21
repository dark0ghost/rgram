import React from "react";
import Nav from "./Nav";

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
    }
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
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
    return (
      <div className="header">
        <div className="brand">
          <img src="http://localhost:443/icon.jpg" className="logo" alt="Brand" />
          <h3>Rgram</h3>
          <input type="text" name="search" value={this.props.search} placeholder="Search" className="search_url" />
        </div>
        <Nav
            logged_in={this.state.logged_in}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
        />
        <h3>
          {this.state.logged_in ? this.state.username : 'Please Log In'}
        </h3>
      </div>
    );
  }
}

export default Header;