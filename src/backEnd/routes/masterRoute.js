const router = require('express').Router()

// import routes
const authRoute = require('./authentication/userAuth')

// Route Middleware
router.use('/api/', authRoute)

module.exports = router