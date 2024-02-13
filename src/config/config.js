const path = require("path");
let dir=__dirname.split("\src")[0]
require("dotenv").config({ path: path.join(dir, "/.env") })

exports.development = {
	username: process.env.DBUSERNAME,
	password: process.env.DBPASSWORD,
	database: process.env.DBNAME,
	host: process.env.HOST,
	dialect:'mysql',
	operatorsAliases: false,
	// logging: false,
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
	   secretKey: process.env.SECRET,
	   uploadUrl:process.env.APPURL
}

