const bycrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require("jsonwebtoken")
//signup logique
const signUp = async (req, role, res)=>{
    try{
         //Get user from database with same name if any
   const ValidateUserName = async (name) =>{
    let user = await User.findOne({name})
    return user ? false : true
}
         //Get employee from database with same email if any
         const ValidateUserEmail = async (email) =>{
            let user = await User.findOne({email})
            return user ? false : true
        }
         // Validate the name
     let nameNoTaken = await ValidateUserName(req.name)
     if(!nameNoTaken){
        res.status(400).json({message: "name already taken"})
     }
         
        // validate the email
        let emailNoTaken = await ValidateUserName(req.email)
        if(!nameNoTaken){
           res.status(400).json({message: "email already taken"})
        }
        // Hash password using bcrypt
        const password = await bycrypt.hash(req.password, 12)

        // create new user
        const newUser = new User({
            ...req,
            password,
            role
        })

        await newUser.save()
        return res.status(201).json({
            message: "Hurry! now you are successfully registred. Please nor login."})
    }catch(err){
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}

const Login = ()