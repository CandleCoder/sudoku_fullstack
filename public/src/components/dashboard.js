import React, { Component } from "react";

export default class Dashboard extends Component {

   componentDidMount() {
    console.log(window.accessToken)
   }

    callForSudokuInit() {
      fetch("http://localhost:5000/v1/api/createNewGame",{
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": window.accessToken }
      })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          alert("Error in Login");
          return Promise.reject(error);
        } else if (response.ok) {
           console.log(data);
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        alert("There was an error!", error);
      });
  }

  render() {
    this.callForSudokuInit();
    return <h3>Dashboard</h3>;
  }
}
