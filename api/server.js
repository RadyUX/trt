
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const express = require("express");
const authRouter = require("./route/auth")
const db = require("./config/database");
const {authRole} = require("./middleware/auth")
const  UserModel = require("./models/User");
const {authUser} = require('./utils/middleware');
const userRoute = require('./route/user')
const postRouter = require("./route/post")
const cors = require("cors")
const dotenv = require('dotenv')
dotenv.config();

const app = express();
 
const port = 3000

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ' http://localhost:5173',
    credentials: true
}));

app.use("/auth",  authRouter);
app.use("/user", userRoute)
app.use("/post", postRouter)

app.get("/auth/post", authRole("candidate"), (req,res)=>{
    res.send('cv sent')
})
app.get("consultant-dashboard", authRole("consultant"), (req,res)=>{
    res.send('consultant dashboard')
})
const initApp = async () => {
    console.log("Testing the database connection..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        
         UserModel.sync({
            alter: true,
         })
        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

/**
 * Initialize the application.
 */
initApp();


// ...

