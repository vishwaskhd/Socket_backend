const Sequelize = require('sequelize');
const path = require("path");
let dir = __dirname.split("\src")[0]
require("dotenv").config({ path: path.join(dir, "/.env") })
const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASSWORD, {

    host: process.env.HOST,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
		// statement_timeout: 1000, // optional timeout for statements in ms
		maxPreparedStatements: 100 // maximum number of prepared statements in cache
	  },
	

    define: {
        timestamps: false
    },

    
});

// exports.randomFileNameGenerator = (fileName, purpose) => {
// 	let strArr = ((fileName).split("."));
// 	let fileExtension = strArr[strArr.length - 1];
// 	let date = new Date();
// 	return `${purpose}_${String(moment(date).format(dateTimeFormat.default)).replace(/\s/g, "")}.${fileExtension}`;
// };

module.exports = sequelize;