"use strict";

const fs = require("fs");
const path = require("path");
// const basename = path.basename(__filename);
const Sequelize = require("sequelize");
require("dotenv").config();
// const env = process.env.NODE_ENV || "development";
const { development } = require("../config/config.js");
const db = {};
let sequelize;
if (development.use_env_variable) {
  sequelize = new Sequelize(
    process.env[development.use_env_variable],
    development
  );
  sequelize.sync({});
} else {
  sequelize = new Sequelize(
    development.database,
    development.username,
    development.password,
    development
  );
  sequelize.sync({});
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./users.js")(sequelize,Sequelize);
db.messages = require("./messages.js")(sequelize,Sequelize);



// // Model relations

db.users.hasMany(db.messages, { foreignKey: "sender_id" });
db.messages.belongsTo(db.users, {  foreignKey: "sender_id"});




module.exports = db;
