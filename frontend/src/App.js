import './App.css';
import React from "react";
import getProfile from "./Profile/Profile";
import logo from "./decor/logo/logo"
import headerPanel from "./headerPanel";


class Home extends React.Component{
  componentDidMount() {
    // TODO: get users
  }

   render() {

    return (
    headerPanel()
    );
  }

}

export default Home;
