const express = require("express")
const{ authRole }= require("../middleware/auth")
const createPost = require("../controller/post")
const router = express.Router()

router.get("/createpost", authRole("recruiter"), createPost)

module.exports = router