const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');  // Assurez-vous que cela pointe vers votre modèle User


const Recruteur = sequelize.define('Recruteur', {
 
    entreprise_nom: {
        type: DataTypes.STRING(255),
        allowNull: true // Une entreprise doit avoir un nom.
    },
    entreprise_adresse: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    entreprise_code_postal: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    entreprise_ville: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false // Chaque recruteur doit être lié à un utilisateur.
    }
});


Recruteur.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
User.hasOne(Recruteur, {
    foreignKey: 'userId'
});

module.exports = Recruteur;