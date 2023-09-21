const express = require('express')
const {handlerefreshToken} = require("../controller/auth")

const router = express.Router()


router.get('/', handlerefreshToken)


module.exports = router