const express = require('express')
const {register, login} = require("../controller/auth")
const getUser = require('../controller/user')
const router = express.Router()

//register
router.post('/register', register)
router.post('/login',login)

module.exports = router