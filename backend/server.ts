import type { AnswerColors, ArrayOf4, messageToServer, userTypes, messageToClient } from "../frontend/types";

import allQuestions from "./allQuestions";

const webSocket = require("ws");
const moment = require("moment");
const express = require("express");
const http = require("http");
const _ = require("underscore");
const os = require("os");

const PORT = 1234;

const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });

server.listen(PORT);
console.log(`Server started on port ${PORT}`);

type Connection = WebSocket;
type userTypesExtended = userTypes | "unrecognised";
type logTypes = "LOG" | "ERR";
type logDetails = "CONN" | "REGI" | "OCCU" | "TYPE" | "REFU" | "VOTE" | "STAR" | "CDOW" | "VOST" | "VOEN" | "VOAL";

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
let answersReceived: number = 0;

let usernameConn: Record<string, Connection> = {};

let thisQuestion: Record<AnswerColors, string> = { red: "", yellow: "", green: "", blue: "" };
let questionNumber: number = -1;

let matchStarted: boolean = false;

let countdownInterval: NodeJS.Timer;
let votingInterval: NodeJS.Timer;

const secondsCountdown = 3;
let countdownCnt: number;
const secondsVote = 15;
let voteTimerCnt: number;

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

				if (userType === "presenter") {
					const ipInfo: messageToClient = {
						type: "ipAddr",
						addr: JSON.stringify(
							os
								.networkInterfaces()
								.Ethernet.filter((addr: { family: string }) => addr.family === "IPv4")[0].address
						)
					};
					conn.send(JSON.stringify(ipInfo));
				}

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
					usernameConn[username] = conn;

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

				answersReceived++;
				answerCount[vote]++;

				if (vote === correctVote) {
					thisRoundScores[username] = numPlayers - correctVotesThisTurn++;
					totScores[username] += thisRoundScores[username];
				}

				connections.presenter.forEach((c) => {
					const reply: messageToClient = {
						type: "numReplies",
						value: answersReceived,
						totPlayers: numPlayers
					};
					c.send(JSON.stringify(reply));
				});

				log("LOG", "VOTE", `${username} voted ${vote}`);

				if (answersReceived === numPlayers) {
					voteTimerCnt = 0;
					log("LOG", "VOAL", "Everybody voted");
				}
				break;

			case "startGame":
				matchStarted = true;
				connections.admin.forEach((c) => {
					const reply: messageToClient = { type: "gameStarted" };
					c.send(JSON.stringify(reply));
				});

				log("LOG", "STAR", "Starting the game");

				break;

			case "nextQuestion":
				questionNumber++;
				Object.keys(thisRoundScores).forEach((name) => (thisRoundScores[name] = 0));
				answerCount.red = 0;
				answerCount.blue = 0;
				answerCount.yellow = 0;
				answerCount.green = 0;
				answersReceived = 0;
				correctVotesThisTurn = 0;

				if (questionNumber === allQuestions.length - 1)
					connections.admin.forEach((c) => {
						const reply: messageToClient = { type: "lastQuestion" };
						c.send(JSON.stringify(reply));
					});

				const answers: ArrayOf4<string> = [
					allQuestions[questionNumber].correct,
					...allQuestions[questionNumber].wrong
				];
				const shuffledAnswers = _.shuffle(answers) as ArrayOf4<string>;

				switch (shuffledAnswers.indexOf(allQuestions[questionNumber].correct)) {
					case 0:
						correctVote = "red";
						break;
					case 1:
						correctVote = "yellow";
						break;
					case 2:
						correctVote = "blue";
						break;
					case 3:
						correctVote = "green";
						break;
				}

				// TODO
				correctVote = "yellow";

				thisQuestion = {
					red: shuffledAnswers[0],
					yellow: shuffledAnswers[1],
					blue: shuffledAnswers[2],
					green: shuffledAnswers[3]
				};

				// Start countdown
				log("LOG", "CDOW", `Starting countdown for question #${questionNumber + 1}`);
				countdownCnt = secondsCountdown;
				countdownInterval = setInterval(() => {
					if (countdownCnt === 0) clearInterval(countdownInterval);

					[...connections.presenter, ...connections.user].forEach((c) => {
						const reply: messageToClient = { type: "countdown", value: countdownCnt };
						c.send(JSON.stringify(reply));
					});

					--countdownCnt;

					// Once countdown is finished, send the questions and start the timer
					if (countdownCnt == -1) {
						log("LOG", "VOST", `Starting voting on question #${questionNumber + 1}`);

						[...connections.presenter, ...connections.user].forEach((c) => {
							const reply: messageToClient = { type: "questions", questions: thisQuestion };
							c.send(JSON.stringify(reply));
						});

						voteTimerCnt = secondsVote;
						votingInterval = setInterval(() => {
							if (voteTimerCnt === 0) clearInterval(votingInterval);

							[...connections.presenter, ...connections.user].forEach((c) => {
								const reply: messageToClient = { type: "timeLeft", value: voteTimerCnt };
								c.send(JSON.stringify(reply));
							});

							--voteTimerCnt;

							// When vote timer is finished, send the results
							if (voteTimerCnt < 0) {
								log("LOG", "VOEN", `Voting closed for question #${questionNumber + 1}`);
								connections.presenter.forEach((c) => {
									const reply: messageToClient = { type: "allResults", scores: answerCount };
									c.send(JSON.stringify(reply));
								});

								const leaderboard = Object.entries(totScores)
									.sort(([n1, s1], [n2, s2]) => s2 - s1)
									.map(([name, score]) => name);

								connections.user.forEach((c, index) => {
									const user = Object.entries(usernameConn).filter(([u, c2]) => c2 === c)[0][0];
									const reply: messageToClient = {
										type: "userResult",
										score: thisRoundScores[user],
										totScore: totScores[user],
										position: 1 + leaderboard.indexOf(user)
									};
									c.send(JSON.stringify(reply));
								});
							}
						}, 1000);
					}
				}, 1000);
				break;

			case "sendLeaderboard":
				const leaderboard = Object.entries(totScores)
					.sort(([n1, s1], [n2, s2]) => s2 - s1)
					.map(([name, score]) => name);

				connections.presenter.forEach((c) => {
					const reply: messageToClient = { type: "finalLeaderboard", leaderboard };
					c.send(JSON.stringify(reply));
				});

				break;
		}
	};

	conn.onclose = (ev: CloseEvent) => {
		connections[userType].splice(connections[userType].indexOf(conn), 1);
	};
});
