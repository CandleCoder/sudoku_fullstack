/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withRouter } from 'react-router'

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: ""};
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
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(this.state),
    };
    fetch("http://localhost:5000/v1/api/login", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          alert("Error in Login");
          return Promise.reject(error);
        } else if (response.ok && data.accessToken) {
          window.accessToken = data.accessToken;
          this.props.history.push({
            pathname: '/dashboard'
          })
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        alert("There was an error!", error);
      });
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Log In</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            className="form-control"
            placeholder="Enter Username"
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
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(Login);
