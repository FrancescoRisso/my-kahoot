import type { AnswerColors, messageToServer, userTypes } from "../frontend/types";
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
type logDetails = "CONN" | "REGI" | "OCCU" | "TYPE" | "REFU" | "VOTE";

const connections: Record<userTypesExtended, Connection[]> = {
	admin: [],
	presenter: [],
	unrecognised: [],
	user: []
};

let totScores: Record<string, number> = {};
let thisRoundScores: Record<string, number> = {};

let answerCount: Record<AnswerColors, number> = {
	red: 0,
	blue: 0,
	yellow: 0,
	green: 0
};

let correctVote: AnswerColors = "yellow";
let correctVotesThisTurn: number = 0;
let numPlayers: number = 0;
let ansersReceived: number = 0;

let matchStarted: boolean = false;

let usernamesList: string[] = [];

const log = (type: logTypes, details: logDetails, message: string) => {
	console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")}\t[${type}]\t[${details}]\t${message}`);
};

wss.on("connection", (conn: Connection) => {
	if (matchStarted) {
		const reply: messageToClient = { type: "gameInProgress" };
		conn.send(JSON.stringify(reply));
		conn.close();
		log("LOG", "REFU", `New unknown refused due to game started`);
		return;
	}

	let reply: messageToClient = { type: "connectionAccepted" };
	conn.send(JSON.stringify(reply));
	log("LOG", "CONN", `New unknown user has connected`);

	connections.unrecognised.push(conn);

	let userType: userTypesExtended = "unrecognised";
	let username: string = "";

	conn.onmessage = (ev: MessageEvent) => {
		const message = JSON.parse(ev.data) as messageToServer;

		switch (message.type) {
			case "userType":
				userType = message.userType;

				// Remove from unrecognised connections
				connections.unrecognised.splice(connections.unrecognised.indexOf(conn), 1);

				// Add to the correct set of connections
				connections[message.userType].push(conn);

				log("LOG", "TYPE", `A user is of type ${userType}`);
				break;

			case "userRegister":
				if (matchStarted) {
					const reply: messageToClient = { type: "gameInProgress" };
					conn.send(JSON.stringify(reply));
					conn.close();

					log("LOG", "REFU", `New user registration refused due to game started`);
					return;
				}

				username = message.name;

				if (usernamesList.includes(username)) {
					// username is taken
					const reply: messageToClient = { type: "userRegister", accepted: false };
					conn.send(JSON.stringify(reply));

					log("LOG", "OCCU", `A user requested the name "${username}", which is already used`);
					username = "";
				} else {
					// username is free
					usernamesList.push(username);

					const reply: messageToClient = { type: "userRegister", accepted: true };
					conn.send(JSON.stringify(reply));

					totScores[username] = 0;
					thisRoundScores[username] = 0;
					numPlayers++;

					log("LOG", "REGI", `A user has chosen the name "${username}"`);
				}
				break;

			case "usernameAvailable":
				username = message.name;

				const reply: messageToClient = {
					type: "usernameAvailable",
					available: !usernamesList.includes(username)
				};
				conn.send(JSON.stringify(reply));
				break;

			case "userVote":
				const vote = message.vote;

				ansersReceived++;
				if (vote === correctVote) {
					thisRoundScores[username] = numPlayers - correctVotesThisTurn++;
					totScores[username] += thisRoundScores[username];
				}

				connections.presenter.forEach((c) => {
					const reply: messageToClient = {
						type: "numReplies",
						value: ansersReceived,
						totPlayers: numPlayers
					};
					c.send(JSON.stringify(reply));
				});

				log("LOG", "VOTE", `${username} voted ${vote}`);
				break;

			case "startGame":
				matchStarted = true;
				connections.admin.forEach((c) => {
					const reply: messageToClient = { type: "gameStarted" };
					c.send(JSON.stringify(reply));
				});

				break;
		}
	};

	conn.onclose = (ev: CloseEvent) => {
		connections[userType].splice(connections[userType].indexOf(conn), 1);
	};
});
