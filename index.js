

const Hapi = require("hapi");

const server = new Hapi.Server();
const Config = require("./Config");
const jwt = require("jsonwebtoken");
const validate = require("./Authentication");

const fs = require("fs");

// ---Server Connection-----
server.connection({
	port: "2002",
	host: "0.0.0.0",
	routes: {
		cors: {
			origin: ["*"],
		},
	},
});
process.on("unhandledRejection", (error) => {
	// Will print "unhandledRejection err is not defined"
	console.log("unhandledRejection", error.message);
});

new Promise((_, reject) => reject(new Error("woops")))
	.catch((error) => {
		// Will not execute
		console.log("caught", err.message);
	});
// ----End--------

// ----Start Server----
function start() {
	try {
		server.start();
	} catch (err) {
		console.log(errr);
	}
	console.log("Server running at:", server.info.uri);
}
start();
// ----END----------

// ----DataBase Connection----
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/places";
mongoose.connect(url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.on("open", () => {
	console.log("database conneced");
});
// ----End Connection-----

mongoose.Promise = require("bluebird");

// -----JWT Authentication-----
server.register(require("hapi-auth-jwt2"), (err) => {
	if (err) {
		console.log(err);
	}
	server.auth.strategy("jwt", "jwt", {
		key: Config.jwt.securityCode, // Never Share your secret key
		validateFunc: validate, // validate function defined above
		verifyOptions: { algorithms: ["HS256"] }, // pick a strong algorithm
	});
	server.auth.default("jwt");

	// ---Routes----
	server.route(require("./Routes/User"));
	server.route(require("./Routes/Category"));
	server.route(require("./Routes/Place"));
});
// ----END-----
