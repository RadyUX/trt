const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const sequelize = require("sequelize")
const dotenv = require("dotenv")
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
        return res.status(201).json({ message: "Hurry! now you are successfully registered. Please now login." });

    } catch (err) {
        return res.status(500).json({ message: `Error: ${err.message}` });
    }
}

const login = async (req, res) =>{

    try {
        // Trouvez l'utilisateur dans la base de données en utilisant l'e-mail fourni
        const user = await User.findOne({ where: { email: req.body.email } });
        
        // Si l'utilisateur n'existe pas
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }
       
        // Vérifiez le mot de passe avec bcrypt
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if(isValidPassword){
            token = jwt.sign({ "id" : user.id,"name" : user.name,"email":user.email, "role": user.role},process.env.JWT);
            res.cookie('token' , token, { httpOnly: true, secure: true, SameSite: 'strict' , expires: new Date(Number(new Date()) + 30*60*1000) }).status(200).json({ token : token });
        
        } else {
            return res.status(400).json({ message: 'Invalid password' });
      

        }
        // Si le mot de passe n'est pas valide
  
        // À ce stade, l'utilisateur est authentifié. Vous pouvez maintenant vérifier son rôle.
        const userRole = user.role;

        // Ici, vous pouvez implémenter la logique pour attribuer des permissions en fonction du rôle de l'utilisateur.
        // Par exemple:
        if (userRole === 'admin') {
         console.log("admin")
        } 

       

    } catch (err) {
        return res.status(500).json({ message: `Error: ${err.message}` });
    }
}

module.exports = {register, login}