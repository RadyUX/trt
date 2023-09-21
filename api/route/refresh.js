const express = require('express')
const {refreshToken} = require("../controller/auth")

const router = express.Router()


router.get('/', refreshToken)


module.exports = router