// index.js

/**
 * Required External Modules
 */
const express = require("express");
const fs = require("fs");
const mysql = require("mysql");

const testMessageMap = new Map();

/**
 * App Variables
 */
let app = express();
const port = process.env.PORT || "8000";
app.set('view engine', 'pug');

/**
 * App Configuration
 */

/**
 * Routes Definitions
 */
app.get("/", function(req, res) {
	res.status(200).send("Hello World!");
});

app.get("/message", function(req, res) {
	let msgId = req.query.msgId;
	let key = req.query.key;
	//res.status(200).send("Id: " + msgId + " :: Key: " + key);
    res.render('returnedmessage', { message: "Id: " + msgId + " :: Key: " + key});
})

/**
 * Server Activation
 */
app.listen(port, () => {
	console.log("Listening to requests on http://localhost:" + port);
});