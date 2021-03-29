/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleChange = this.handleChangeUserName.bind(this);
    this.handleChange = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUserName = (event) => {
    this.setState({ username: event.target.value });
  };
  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit(event) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };
    fetch("http://localhost:5000/v1/api/register", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          alert("Error in Sign Up");
          return Promise.reject(error);
        } else if (response.ok) {
          alert('You have been Signed Up, Kindly Login Now');
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        alert("There was an error during Server Process!", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            className="form-control"
            placeholder="Enter your Username"
            value={this.state.username}
            onChange={this.handleChangeUserName}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </form>
    );
  }
}
