import type { messageToServer, userTypes } from "../frontend/types";
import { messageToClient } from "../frontend/types";

const webSocket = require("ws");
const moment = require("moment");
const express = require("express");
const http = require("http");

const PORT = 1234;

const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });

server.listen(PORT);
console.log(`Server started on port ${PORT}`);

type Connection = WebSocket;
type userTypesExtended = userTypes | "unrecognised";
type logTypes = "LOG" | "ERR";
type logDetails = "CONN" | "REGI" | "OCCU" | "TYPE";

const connections: Record<userTypesExtended, Connection[]> = {
	admin: [],
	presenter: [],
	unrecognised: [],
	user: []
};

const totScores: Record<string, number> = {};
const thisRoundScores: Record<string, number> = {};

const usernamesList: string[] = [];

const log = (type: logTypes, details: logDetails, message: string) => {
	console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")}\t[${type}]\t[${details}]\t${message}`);
};

wss.on("connection", (conn: Connection) => {
	connections.unrecognised.push(conn);

	let userType: userTypesExtended = "unrecognised";
	let username: string = "";

	log("LOG", "CONN", `New unknown user has connected`);

	conn.onmessage = (ev: MessageEvent) => {
		const message = JSON.parse(ev.data) as messageToServer;

		switch (message.type) {
			case "userType":
				userType = message.userType;
				connections.unrecognised.splice(connections.unrecognised.indexOf(conn), 1);
				connections[message.userType].push(conn);
				log("LOG", "TYPE", `A user is of type ${userType}`);
				break;

			case "userRegister":
				username = message.name;
				if (usernamesList.includes(username)) {
					const reply: messageToClient = {
						type: "userRegister",
						accepted: false,
						reason: "usernameAlreadyTaken"
					};
					conn.send(JSON.stringify(reply));
					username = "";
					log("LOG", "REGI", `A user has chosen the name "${username}"`);
				} else {
					usernamesList.push(username);
					const reply: messageToClient = { type: "userRegister", accepted: true };
					conn.send(JSON.stringify(reply));
					log("LOG", "OCCU", `A user requested the name "${username}", which is already used`);
				}
				break;
		}
	};

	conn.onclose = (ev: CloseEvent) => {
		connections[userType].splice(connections[userType].indexOf(conn), 1);
	};
});

const messageHandler = () => {};
