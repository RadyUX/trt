const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Candidate = require('./Candidate');
const Post = require('./Post');

const Post = require('./Post'); // Assumant que 'Post' est votre modèle d'offre d'emploi

const Candidature = sequelize.define('Candidature', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('en_attente', 'approuvé', 'rejeté'),
        allowNull: false,
        defaultValue: 'en_attente'
    },
    dateDeSoumission: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id'
        },
        allowNull: false
    }
});

Candidature.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Candidature.belongsTo(Post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

module.exports = Candidature;