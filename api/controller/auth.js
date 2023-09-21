const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const sequelize = require("sequelize")
const dotenv = require("dotenv")
const Recruiter = require("../models/Recruiter")
const Candidate = require("../models/Candidate")
//signup logique

const register = async (req, res, role)=>{
    try {
        
        // Valider si le nom existe déjà
        const existingName = await User.findOne({ where: { name: req.body.name } });
        if (existingName) {
            return res.status(400).json({ message: "name already taken" });
        }

        // Valider si l'email existe déjà
        const existingEmail = await User.findOne({ where: { email: req.body.email } });
        if (existingEmail) {
            return res.status(400).json({ message: "email already taken" });
        }

        // Hash du mot de passe avec bcrypt
        const salt =  bcrypt.genSaltSync(12)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // Créer un nouvel utilisateur
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role  
        });

        await newUser.save()

        if (req.body.role === 'recruiter') {
            await Recruiter.create({
                userId: newUser.id,
               
            });
        }

        if (req.body.role === 'candidate') {
            await Candidate.create({
                userId: newUser.id,
                name:  newUser.name,
                
               
            });
        }
        return res.status(201).json({ message: "Hurry! now you are successfully registered. Please now login." });

    } catch (err) {
        return res.status(500).json({ message: `Error: ${err.message}` });
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        
        if(isValidPassword) {
            const accessToken = jwt.sign({
                id: user.id, 
                name: user.name, 
                email: user.email, 
                role: user.role
            }, process.env.JWT, { expiresIn: '1d' });

            const refreshToken = jwt.sign({
                id: user.id, 
                name: user.name, 
                email: user.email, 
                role: user.role
            }, process.env.REFRESH, { expiresIn: '1d' });

            // Stockez le refreshToken dans la base de données ou une structure de données appropriée

            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, SameSite: 'strict' });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, SameSite: 'strict' });

            return res.status(200).json({ accessToken });
        } else {
            return res.status(400).json({ message: 'Invalid password' });
        }
    } catch (err) {
        return res.status(500).json({ message: `Error: ${err.message}` });
    }
}

// Route pour rafraîchir le token
const handlerefreshToken = async (req, res) => {
    const cookies = req.cookies;
    
    if (!cookies?.refreshToken) return res.sendStatus(401);
    
    const refreshToken = cookies.refreshToken;

    // Vérifier le refreshToken
    jwt.verify(refreshToken, process.env.REFRESH, (err, user) => {
        if (err) return res.sendStatus(403);
        
        const accessToken = jwt.sign({
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role
        }, process.env.JWT, { expiresIn: '30s' });

    
        res.json({ accessToken });
    });
}



module.exports = { register, login, handlerefreshToken };