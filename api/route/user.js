
const getUser = require('../controller/user')
const Validation = require("../middleware/auth")
const router = express.Router()

//register

router.get('/profile',login)

module.exports = router