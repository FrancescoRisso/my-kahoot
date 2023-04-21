/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
*/

import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../components/Context";
import { ArrayOf4, messageToClient, messageToServer } from "../../types";
import AdminPage from "./AdminPage";

export interface AdminBehaviourPageProps {}

type validStatus =
	| "blank"
	| "introduction"
	| "waitForGameStart"
	| "question"
	| "lastQuestion"
	| "leaderboard"
	| "wordsShow"
	| "finalBlank";

const AdminBehaviourPage = () => {
	const context = useContext(Context);

	const [currentStatus, setCurrentStatus] = useState<validStatus>("blank");
	const [allAnswers, setAllAnswers] = useState<ArrayOf4<string>[]>([]);
	const [questionNo, setQuestionNo] = useState<number>(-1);

	const sendMessage = useCallback(
		(message: messageToServer) => {
			context.ws.val?.send(JSON.stringify(message));
		},
		[context.ws]
	);

	const wsMessageHandler = useCallback(
		(ev: MessageEvent) => {
			const msg: messageToClient = JSON.parse(ev.data);

			switch (msg.type) {
				case "gameInProgress":
					break;
				case "connectionAccepted":
					break;
				case "gameStarted":
					console.debug("ReceivedGameStarted");
					sendMessage({ type: "nextQuestion" });
					setCurrentStatus("question");
					setQuestionNo(0);
					break;
				case "lastQuestion":
					setCurrentStatus("lastQuestion");
					break;
				case "allAnswers":
					setAllAnswers(msg.answers);
					break;
				default:
					break;
			}
		},
		[sendMessage]
	);

	useEffect(() => {
		if (context.ws.val !== null) {
			context.ws.val.removeEventListener("message", wsMessageHandler);
			context.ws.val?.addEventListener("message", wsMessageHandler);
		} // eslint-disable-next-line
	}, [context.ws]);

	const nextAction: () => () => void = useCallback(() => {
		switch (currentStatus) {
			case "blank":
				return () => {
					sendMessage({ type: "requestNotify", to: "presenter", notification: "showIntro" });
					setCurrentStatus("introduction");
				};
			case "introduction":
				return () => {
					sendMessage({ type: "startGame" });
					setCurrentStatus("waitForGameStart");
				};
			case "waitForGameStart":
				return () => {
					return;
				};
			case "question":
				return () => {
					sendMessage({ type: "nextQuestion" });
					setQuestionNo(questionNo + 1);
				};
			case "lastQuestion":
				return () => {
					sendMessage({ type: "sendLeaderboard" });
					setCurrentStatus("leaderboard");
					setQuestionNo(-1);
				};
			case "leaderboard":
				return () => {
					sendMessage({ type: "sendCorrectAnswers", to: "presenter" });
					setCurrentStatus("wordsShow");
				};
			case "wordsShow":
				return () => {
					sendMessage({ type: "requestNotify", to: "presenter", notification: "showFinalBlank" });
					setCurrentStatus("finalBlank");
				};
			case "finalBlank":
				return () => {
					return;
				};
		}
	}, [currentStatus, sendMessage, questionNo]);

	console.debug(currentStatus, questionNo);

	return <AdminPage highlightedRow={questionNo} allWords={allAnswers} device="phone" nextAction={nextAction()} />;
};

export default AdminBehaviourPage;
