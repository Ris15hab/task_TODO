// const sequelize = require('sequelize')
const Models = require('./AllModels');
const db = require('./dbconnection');

//user relations
exports.modelRelationships = async () => {
    Models.user.hasMany(Models.task);
    Models.task.belongsTo(Models.user);

    db.sync({ force: false }).then(() => {
        console.log("re synced");
    }).catch((err) => {
        console.log(err);
    });
}
