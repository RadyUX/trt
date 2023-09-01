const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Post = sequelize.define('Post', {
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    location:  {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isValidated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    }
})

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

module.exports = Post;