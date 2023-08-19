const Sequelize=require('sequelize');
const db=require('../utils/dbconnection');
const bcrypt = require('bcrypt')

const user = db.define("user", {
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: false,
});

user.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

module.exports = user;