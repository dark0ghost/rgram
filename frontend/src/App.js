import './App.css';
import React from "react";
import getProfile from "./Profile/Profile";
import logo from "./decor/logo/logo"


class Home extends React.Component{
  componentDidMount() {
    // TODO: get users
  }

   render() {

    return (
      logo()
    );
  }

}

export default Home;
