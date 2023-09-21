const  UserModel = require("../models/User")

const getUser = (req, res, next) => {
    
    UserModel.findAll()
    .then((result) => {
      	return res.json(result);
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: 'Unable to fetch the record!'
        });
    });
}


const User = require('../models/User');

exports.createConsultant = async (req, res) => {
    try {
        // Vérifiez si l'utilisateur actuel est un administrateur
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Seul un administrateur peut créer un consultant.' });
        }

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
};


module.exports = getUser