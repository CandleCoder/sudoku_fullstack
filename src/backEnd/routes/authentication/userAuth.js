const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const User = require('../../models/userModel')
const JWTAuthenticator = require('../../middleware/JWTAuthenticator')


// Register
router.post('/register', async (req, res) => {
    // Check if User Exists in DB
    const userNameExists = await User.findOne({ username: req.body.username })
    if (userNameExists) return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT)
    
    // New User Object
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'REGISTEREDUSER',
    })

    try {
      // Save the user
      await user.save((saveError, savedUser) => {
        if (saveError) logger.log(saveError)
        console.log(savedUser)
        return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)
      })
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
    return true
  })

router.post('/login', async (req, res) => {
    // Read username and password from request body
    const { username, password } = req.body

    // Filter user from the users array by username and password
    const user = await User.findOne({username: username, password: password}).exec()

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.ACCESS_SECRET_TOKEN)

        res.json({
            accessToken
        })
    } else {
        res.send('Username or password incorrect')
    }
})

router.get('/currentGame', JWTAuthenticator, async (req, res) => {
    res.json('Done')
})

module.exports = router