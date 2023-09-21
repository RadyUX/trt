const express = require("express")
const getUser = require('../controller/user')
const Validation = require("../middleware/auth")
const{ authRole }= require("../middleware/auth")
const router = express.Router()

//register

router.get('/profile', getUser)

router.post('/create', authRole('admin'),async (req, res) => {
    try {
       
        // Récupérez les données du formulaire
        const { name, email, password } = req.body;

        // Créez un nouvel utilisateur avec le rôle de consultant
        const newConsultant = await User.create({
            name: name,
            email: email,
            password: password, // Note: Assurez-vous de hacher le mot de passe avant de le stocker
            role: 'consultant'
        });

        res.status(201).json({ message: 'Consultant créé avec succès', data: newConsultant });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création du consultant" });
    }
} )

module.exports = router