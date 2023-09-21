const express = require("express")
const{ authRole }= require("../middleware/auth")
const createPost = require("../controller/post")
const router = express.Router()

router.get("/createpost", authRole("recruiter"),(req, res) => {
    // Logique pour créer un post
    res.json({ message: "Post created successfully" })})

module.exports = router