const Sequelize=require('sequelize');
const db=require('../utils/dbconnection');

const task = db.define("task", {
    description: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.ENUM("Completed", "Not Completed"),
    },
    due_date:{
        type: Sequelize.DATE
    },
    userId: {
        type: Sequelize.INTEGER,
    }
}, {
    timestamps: false,
});

module.exports = task;