import type {
	AnswerColors,
	ArrayOf4,
	messageToServer,
	userTypes,
	messageToClient,
	userLeaderboardValues
} from "../frontend/types";

import allQuestions from "./allQuestions";

const webSocket = require("ws");
const moment = require("moment");
const express = require("express");
const http = require("http");
const _ = require("underscore");

const PORT = 1234;

const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });

server.listen(PORT);
console.log(`Server started on port ${PORT}`);

type Connection = WebSocket;
type userTypesExtended = userTypes | "unrecognised";
type logTypes = "LOG" | "ERR";
type logDetails =
	| "CONN" // connected
	| "REGI" // registered
	| "OCCU" // username occupied
	| "TYPE" // user set its type
	| "REFU" // connection refused
	| "VOTE" // user voted
	| "STAR" // game starting
	| "CDOW" // countdown
	| "VOST" // voting started
	| "VOEN" // voting ended
	| "VOAL" // everybody voted
	| "LEAD" // sending leaderboard
	| "NOTI" // notification
	| "ANSW" // sending all answers
	| "CLOS" // user closed connection
	| "NTOK" // new token assigned
	| "ETOK"; // existing token logged in

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

let tokenConn: Record<string, Connection> = {};
let tokenUsername: Record<string, string> = {};
let tokenUserTypes: Record<string, userTypesExtended> = {};

let numConnections: number = 0;

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

let isTestRound: boolean = true;

const log = (type: logTypes, details: logDetails, message: string) => {
	console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")}\t[${type}]\t[${details}]\t${message}`);
};

const bulkSend = (
	recipient: userTypesExtended | userTypesExtended[],
	message: messageToClient | ((c: Connection) => messageToClient)
) => {
	if (!Array.isArray(recipient)) recipient = [recipient];

	recipient.forEach((rec) => {
		connections[rec].forEach((c) => c.send(JSON.stringify(typeof message === "function" ? message(c) : message)));
	});
};

const getLeaderboard = () => {
	const leaderboard = Object.entries(totScores)
		.sort(([n1, s1], [n2, s2]) => s2 - s1)
		.map(([name, score], index): userLeaderboardValues => {
			return { name, score, position: index };
		});

	return leaderboard.map(({ name, score, position }) => {
		while (position != 0 && leaderboard[position - 1].score === score) position--;
		return { name, score, position: position + 1 };
	});
};

wss.on("connection", (conn: Connection) => {
	// if (matchStarted) {
	// 	const reply: messageToClient = { type: "gameInProgress" };
	// 	conn.send(JSON.stringify(reply));
	// 	conn.close();
	// 	log("LOG", "REFU", `New unknown refused due to game started`);
	// 	return;
	// }

	// let reply: messageToClient = { type: "connectionAccepted" };
	// conn.send(JSON.stringify(reply));
	// log("LOG", "CONN", `New unknown user has connected`);

	connections.unrecognised.push(conn);

	let token: string;

	let tokenRequest: messageToClient = { type: "tokenRequest" };
	conn.send(JSON.stringify(tokenRequest));

	conn.onmessage = (ev: MessageEvent) => {
		const message = JSON.parse(ev.data) as messageToServer;

		switch (message.type) {
			// Used to relog when logout happens
			case "tokenResponse":
				let tokenResponse: string | undefined = message.token;

				if (!tokenResponse || !Object.keys(tokenConn).includes(tokenResponse)) {
					token = `${++numConnections}`;
					tokenConn[token] = conn;
					tokenUserTypes[token] = "unrecognised";

					const sendToken: messageToClient = { type: "tokenAssign", token: token };
					conn.send(JSON.stringify(sendToken));

					log("LOG", "NTOK", `A user was assigned token ${token}`);
				} else {
					token = tokenResponse;

					const confirmToken: messageToClient = { type: "tokenConfirm" };
					conn.send(JSON.stringify(confirmToken));

					log(
						"LOG",
						"ETOK",
						`User with token ${token} ${
							tokenUsername[token] && `(username: ${tokenUsername[token]}) `
						}logged back in`
					);
				}

				break;

			case "userType":
				tokenUserTypes[token] = message.userType;

				// Remove from unrecognised connections
				connections.unrecognised.splice(connections.unrecognised.indexOf(conn), 1);

				// Add to the correct set of connections
				connections[message.userType].push(conn);

				if (tokenUserTypes[token] === "admin") {
					const reply: messageToClient = {
						type: "allAnswers",
						answers: allQuestions.map((question) => [question.correct, ...question.wrong])
					};
					conn.send(JSON.stringify(reply));
				}

				if (tokenUserTypes[token] === "presenter") {
					const reply: messageToClient = { type: "totUsers", totUsers: numPlayers };
					conn.send(JSON.stringify(reply));
				}

				log("LOG", "TYPE", `A user is of type ${tokenUserTypes[token]}`);
				break;

			case "userRegister":
				if (matchStarted) {
					const reply: messageToClient = { type: "gameInProgress" };
					conn.send(JSON.stringify(reply));
					conn.close();

					log("LOG", "REFU", `New user registration refused due to game started`);
					return;
				}

				let username = message.name;

				if (usernamesList.includes(username)) {
					// username is taken
					const reply: messageToClient = { type: "userRegister", accepted: false };
					conn.send(JSON.stringify(reply));

					log("LOG", "OCCU", `A user requested the name "${username}", which is already used`);
					username = "";
				} else {
					// username is free
					usernamesList.push(username);
					tokenConn[token] = conn;
					tokenUsername[token] = username;

					const reply: messageToClient = { type: "userRegister", accepted: true };
					conn.send(JSON.stringify(reply));

					totScores[token] = 0;
					thisRoundScores[token] = 0;
					numPlayers++;

					bulkSend("presenter", { type: "totUsers", totUsers: numPlayers });

					log("LOG", "REGI", `A user has chosen the name "${username}"`);
				}
				break;

			case "usernameAvailable":
				let requestedUsername = message.name;

				const reply: messageToClient = {
					type: "usernameAvailable",
					available: !usernamesList.includes(requestedUsername)
				};
				conn.send(JSON.stringify(reply));
				break;

			case "userVote":
				const vote = message.vote;

				answersReceived++;
				answerCount[vote]++;

				if (vote === correctVote) {
					thisRoundScores[token] = numPlayers - correctVotesThisTurn++;
					totScores[token] += thisRoundScores[token];

					if (isTestRound) {
						thisRoundScores[token] = 0;
						totScores[token] = 0;
					}
				}

				bulkSend("presenter", { type: "numReplies", value: answersReceived });

				log("LOG", "VOTE", `${tokenUsername[token]} voted ${vote}`);

				if (answersReceived === numPlayers) {
					voteTimerCnt = 0;
					log("LOG", "VOAL", "Everybody voted");
				}
				break;

			case "startGame":
				matchStarted = true;

				bulkSend("unrecognised", { type: "gameInProgress" });
				connections.user.forEach((c) => {
					if (!Object.values(tokenConn).includes(c)) {
						c.send(JSON.stringify({ type: "gameInProgress" } as messageToClient));
						c.close();
					}
				});

				bulkSend("admin", { type: "gameStarted" });

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

				if (questionNumber === allQuestions.length - 1) bulkSend("admin", { type: "lastQuestion" });

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

				thisQuestion = {
					red: shuffledAnswers[0],
					yellow: shuffledAnswers[1],
					blue: shuffledAnswers[2],
					green: shuffledAnswers[3]
				};

				// Choose a random correct answer if they are all the same
				if (allQuestions[questionNumber].correct === allQuestions[questionNumber].wrong[0]) {
					correctVote = _.shuffle(["yellow", "red", "green", "blue"])[0];
				}

				// Start countdown
				log("LOG", "CDOW", `Starting countdown for question #${questionNumber + 1}`);
				countdownCnt = secondsCountdown;
				countdownInterval = setInterval(() => {
					if (countdownCnt === 0) clearInterval(countdownInterval);

					bulkSend(["presenter", "user"], { type: "countdown", value: countdownCnt });

					--countdownCnt;

					// Once countdown is finished, send the questions and start the timer
					if (countdownCnt == -1) {
						log("LOG", "VOST", `Starting voting on question #${questionNumber + 1}`);

						bulkSend(["presenter", "user"], {
							type: "question",
							question: allQuestions[questionNumber].question,
							answers: thisQuestion
						});

						voteTimerCnt = secondsVote;
						votingInterval = setInterval(() => {
							if (voteTimerCnt === 0) clearInterval(votingInterval);

							bulkSend(["presenter", "user"], { type: "timeLeft", value: voteTimerCnt });

							--voteTimerCnt;

							// When vote timer is finished, send the results
							if (voteTimerCnt < 0) {
								log("LOG", "VOEN", `Voting closed for question #${questionNumber + 1}`);
								bulkSend("presenter", {
									type: "allResults",
									scores: answerCount,
									correctColor: correctVote
								});

								const leaderboard = getLeaderboard();

								bulkSend("user", (c) => {
									const user = Object.entries(tokenConn).filter(([u, c2]) => c2 === c)[0][0];
									return {
										type: "userResult",
										score: thisRoundScores[user],
										totScore: totScores[user],
										position: leaderboard.filter(({ name }) => name === user)[0].position
									};
								});

								isTestRound = false;
							}
						}, 1000);
					}
				}, 1000);
				break;

			case "sendLeaderboard":
				bulkSend("presenter", { type: "finalLeaderboard", leaderboard: getLeaderboard() });

				log("LOG", "LEAD", "Sending leaderboard to presenters");
				break;

			case "sendCorrectAnswers":
				const destUserType = message.to;
				bulkSend(destUserType, {
					type: "correctAnswers",
					answers: allQuestions.map((question) => question.correct)
				});

				log("LOG", "ANSW", `Sending correct answers to ${destUserType}s`);
				break;

			case "requestNotify":
				const notification = message.notification;
				const recipient = message.to;

				bulkSend(recipient, { type: "notify", notification });

				log("LOG", "NOTI", `Notifying ${recipient}s: "${notification}"`);
				break;

			// case "ping":
			// 	conn.send(JSON.stringify({ type: "pong" } as messageToClient));
		}
	};

	conn.onclose = (ev: CloseEvent) => {
		// connections[tokenUserTypes[token]].splice(connections[tokenUserTypes[token]].indexOf(conn), 1);

		// if (tokenUserTypes[token] === "user") {
		// 	numPlayers--;
		// 	bulkSend("presenter", { type: "totUsers", totUsers: numPlayers });
		// }

		log(
			"LOG",
			"CLOS",
			tokenUserTypes[token] === "user"
				? `User ${tokenUsername[token]} closed connection`
				: `A ${tokenUserTypes[token]} closed connection`
		);
	};
});
