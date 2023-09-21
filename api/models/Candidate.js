const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Candidate = sequelize.define('Candidate', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
  
    CVPath: {
        type: DataTypes.STRING(255),
        allowNull: true // Make it false if CV is mandatory
    }
});

// Association: one-to-one relation between Candidate and User
Candidate.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

module.exports = Candidate;
