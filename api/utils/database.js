const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require("../models/User")
const sequelize = new Sequelize(
 'mydb',
 'root',
 'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);


const User = UserModel(sequelize, DataTypes)


const initDb = () => {
    return sequelize.sync().then(() => {
        console.log(' table created successfully!');
     }).catch((error) => {
        console.error('Unable to create table : ', error);
     });
      
     console.log('La base de donnée a bien été initialisée !')
}
module.exports = {sequelize, initDb, User};