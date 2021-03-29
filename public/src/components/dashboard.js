import React, { Component } from "react";

export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataIsReturned : false
    }
  }
  componentWillMount() {
     this.callForSudokuInit();
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
          this.setState({ sudoku: data.generatedSudoku });
          this.setState({dataIsReturned : true});
        }
      }).catch((error) => {
        this.setState({ errorMessage: error.toString() });
        alert("There was an error!", error);
      });
  }

  listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }
    console.log(matrix)
    return matrix;
}

  render() {
    if (this.state.dataIsReturned) {
      let { sudoku } = this.state;
      sudoku = this.listToMatrix(sudoku, 9);
      console.log(sudoku)
      return (
        <div>
          <h3> sudoku </h3>
          {sudoku.map((row, i) => (
            <div key={i}>
              {row.map((col, j) => (
                <input
                type="text"
                value={col}
                disabled={true}
             />
              ))}
            </div>
          ))}
          <button type="submit" className="btn btn-primary btn-block">
          Check Answer
          </button>

          <button type="submit" className="btn btn-primary btn-block">
          Reset sudoku
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}
