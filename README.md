# Sudoku FullStack

Sudoku Game Based on ExpressJS and ReactJS with MongoDB as Database.

## Installation

After Closing the Repo , Use the Node package manager to install the Dependencies under the Root Folder and public Folder - 

```bash
npm install
```

## Usage
To Start Express Server Run the Below Command From Root Folder
```javascript
 npm start 
```

To Start Front End App Run the Below Command From public Folder placed in Root Directory
```javascript
 npm start 
```

BACKEND APIs Detail to Register, Login,  CreateSudokuGame, Getting Solution, Reset Puzzle, Update Puzzle Data on User Inputs are Respectively : 
```javascript
 v1/api/register
 v1/api/login
 v1/api/createNewGame
 v1/api/solution
 v1/api/reset
 v1/api/updatePuzzleData
```

JWT Accesstoken is Returned in Success Login Body, Kindly Use this Token with Authorization Header for Accessing the OTHER APIs.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
