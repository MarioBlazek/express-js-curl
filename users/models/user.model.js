const { DataTypes } = require('sequelize');
const sequelize = require("../../common/services/mysql.service");

const User = sequelize.sequelize.define('user', {
    id: {
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        type: DataTypes.UUID
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
    },
    permissionLevel: {
        type: DataTypes.INTEGER
    }
});

exports.User = User;