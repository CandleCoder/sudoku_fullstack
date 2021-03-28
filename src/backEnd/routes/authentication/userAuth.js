const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const User = require("../../models/userModel");
const JWTAuthenticator = require("../../middleware/JWTAuthenticator");
const sudoku = require("sudoku");

// API to Register a USER on the basis of unique username
router.post("/register", async (req, res) => {
  // Check if User Exists in DB
  const userNameExists = await User.findOne({ username: req.body.username });
  if (userNameExists)
    return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);

  // New User Object
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: "REGISTEREDUSER",
    generatedSudoku: null,
    userSudokuData: null,
  });
  try {
    // Save the user
    user.save((saveError, savedUser) => {
      if (saveError) logger.log(saveError);
      console.log(savedUser);
      Promise.resolve(res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED));
    });
  } catch (err) {
    Promise.resolve(res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR));
  }
});

// API to Login into app with username and password in body
router.post("/login", async (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  // Filter user from the users array by username and password
  const user = await User.findOne({
    username: username,
    password: password,
  }).exec();

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, role: user.role, userId: user._id },
      process.env.ACCESS_SECRET_TOKEN,
      { noTimestamp: true, expiresIn: "12h" }
    );

    res.json({
      accessToken,
    });
  } else {
    Promise.resolve(res.send("Username or password incorrect"));
  }
});

// API To get a new Sudoku Game
router.put("/createNewGame", JWTAuthenticator, async (req, res) => {
  const username = req.username;
  let puzzle = sudoku.makepuzzle();
  const user = await User.findOne({ username: username }).exec();
  if (user && user.generatedSudoku === null) {
    const update = { generatedSudoku: puzzle };
    await User.findOneAndUpdate({ username: username }, update , (err , user) => {
      Promise.resolve(res.json(user));
    }).exec();
    console.log("Newly Created");
  } else {
    console.log("Old Game Returned");
    Promise.resolve(res.json(user));
  }
});

// API to get the Puzzle Solution
router.get("/solution", JWTAuthenticator, async (req, res) => {
  const username = req.username;
  const user = await User.findOne({ username: username }).exec();
  let puzzle = user.generatedSudoku;
  const solution = sudoku.solvepuzzle(puzzle);
  Promise.resolve(res.json(solution));
});

// API to Reset the Puzzle
router.put("/reset", JWTAuthenticator, async (req, res) => {
  const username = req.username;
  const update = { generatedSudoku: null, userSudokuData: null };
  await User.findOneAndUpdate({ username: username }, update , (err , user) => {
    Promise.resolve(res.json(user));
  }).exec();
  console.log("Reset Completed");
});

// API to Update the User Input Sudoku
router.put("/updatePuzzleData", JWTAuthenticator, async (req, res) => {
  const username = req.username;
  const update = { userSudokuData: req.body.userSudokuData };
  await User.findOneAndUpdate({ username: username }, update , (err , user) => {
    Promise.resolve(res.json(user.userSudokuData));
  }).exec();
  console.log("Updated");
});

module.exports = router;
