module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM('recruiter', 'candidate', 'consultant', 'admin'),
        allowNull: false
      }
    });
  };
  