const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Method to compare hashed password with user input
checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
}
}

User.init(
{
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },

    username: { 
    type: DataTypes.STRING,
    allowNull: false,
    },

    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true,
    },
    },

    
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [8], // Minimum length for password
    },
    },
    // Additional fields as needed
    bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    },
},
{
    // Hashing password before creating a new user
    hooks: {
    beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
    },
    beforeBulkCreate: async (users) => {
        for (const user of users) {
        user.password = await bcrypt.hash(user.password, 10);
        }
    },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
}
);

module.exports = User;