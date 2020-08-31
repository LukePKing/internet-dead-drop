// index.js

/**
 * Required External Modules
 */
const express = require("express");
const fs = require("fs");
const mysql = require("mysql");
const crypto = require("crypto");
const {v4: uuidv4 } = require("uuid");
const formidableMiddleware = require("express-formidable");

// Temp solution for now
const testMessageMap = new Map();

/**
 * App Variables
 */
const app = express();
const path = require("path");
const port = process.env.PORT || "8000";
app.set("view engine", "pug");
app.use(formidableMiddleware());

/**
 * App Configuration
 */
 const NOTHING_FOUND_MSG = "Nothing Found.";

/**
 * Routes Definitions
 */
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/message", function(req, res) {
	let msgId = req.query.msgId;
	let key = req.query.key;

    // If we dont get msgId, send nothing.
    if(typeof msgId === "undefined" || typeof key === "undefined") {
        res.send(NOTHING_FOUND_MSG);
        return;
    }

    if(!testMessageMap.has(msgId)) {
        res.send(NOTHING_FOUND_MSG);
        return;
    }

    let returnedMsg = testMessageMap.get(msgId);
    testMessageMap.delete(msgId);

	//res.status(200).send("Id: " + msgId + " :: Key: " + key);
    res.render('returnedmessage', { message: returnedMsg } );
})

app.post("/", function (req, res) {
    // Randomly generate an id
    let msgId = uuidv4();

    // Store in Map (for now)
    let message = req.fields.message;
    testMessageMap.set(msgId, message);

    let link = "http://localhost:" + port + "/message?msgId=" + msgId + "&key=none";

    res.send("Your one-time retrieval link is: " + link);
})

/**
 * Server Activation
 */
app.listen(port, () => {
	console.log("Listening to requests on http://localhost:" + port);
});