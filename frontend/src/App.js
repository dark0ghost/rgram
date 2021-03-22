import './App.css';
import React from "react";
import renderPanel from "./headerPanel";


class Home extends React.Component{
  componentDidMount() {
    // TODO: get users
  }

   render() {
    return (
      renderPanel()
    );
  }

}

export default Home;
