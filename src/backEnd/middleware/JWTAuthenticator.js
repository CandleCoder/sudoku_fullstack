const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

// A JWT Validator
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
            if (err) {
                return res.sendStatus(StatusCodes.FORBIDDEN)
            }
            req.username = user.username
            req.userId = user._id
            next()
        })
    } else {
        res.sendStatus(StatusCodes.UNAUTHORIZED)
    }
}