import React, { Component } from "react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: "" };
  }

  render() {
    return <h3>Dashboard</h3>;
  }
}
