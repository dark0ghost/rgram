import React from "react";
import logo from '../decor/logo/icon.jpg';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: ""
    }
  }
  render() {
    return (
      <div className="header">
        <div className="brand">
          <img src={logo} className="logo" alt="Brand" />
          <h3>Instagram</h3>
          <input type="text" name="search" value={this.props.search} placeholder="Search" className="search_url" />
        </div>
        <Link to="/add"><button className="add-post">Add Post</button></Link>
      </div>
    );
  }
}

export default Header;