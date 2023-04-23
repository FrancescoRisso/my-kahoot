/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
*/

import { useContext, useState, useCallback, useEffect } from "react";
import { messageToClient, AnswerColors, userLeaderboardValues } from "../../types";
import { Context } from "../components/Context";
import PresenterTextPage from "./PresenterTextPage";
import CountdownPage from "./CountdownPage";
import PresenterQuestionPage from "./PresenterQuestionPage";
import PresenterResultPage from "./PresenterResultPage";
import PresenterRankingPage from "./PresenterLeaderboardPage";
import PresenterWordsRecap from "./PresenterWordsRecap";
import settings from "../settings";

export interface PresenterBehaviourPageProps {}

type validStatus =
	| "blankPage"
	| "ABC"
	| "serviceInfos"
	| "countdown"
	| "question"
	| "questionResult"
	| "leaderboard"
	| "allWords"
	| "finalBlank";

const PresenterBehaviourPage = () => {
	const context = useContext(Context);

	const [currentStatus, setCurrentStatus] = useState<validStatus>("blankPage");

	const [numReplies, setNumReplies] = useState<number>(0);
	const [totUsers, setTotUsers] = useState<number>(0);
	const [answers, setAnswers] = useState<Record<AnswerColors, string>>({
		red: "",
		yellow: "",
		blue: "",
		green: ""
	});
	const [question, setQuestion] = useState<string>("");
	const [timer, setTimer] = useState<number>(0);
	const [leaderboard, setLeaderboard] = useState<userLeaderboardValues[]>([]);
	const [votesPerAnswer, setVotesPerAnswer] = useState<Record<AnswerColors, number>>({
		red: 0,
		yellow: 0,
		blue: 0,
		green: 0
	});
	const [correcAnswers, setCorrectAnswers] = useState<string[]>([]);
	const [correctColor, setCorrectColor] = useState<AnswerColors>("red");

	const wsMessageHandler = useCallback((ev: MessageEvent) => {
		const msg: messageToClient = JSON.parse(ev.data);

		switch (msg.type) {
			case "totUsers":
				setTotUsers(msg.totUsers);
				break;

			case "numReplies":
				setNumReplies(msg.value);
				break;

			case "question":
				setAnswers(msg.answers);
				setQuestion(msg.question);
				setCurrentStatus("question");
				break;

			case "countdown":
				setTimer(msg.value);
				setCurrentStatus("countdown");
				break;

			case "timeLeft":
				setTimer(msg.value);
				break;

			case "allResults":
				setVotesPerAnswer(msg.scores);
				setCorrectColor(msg.correctColor);
				setCurrentStatus("questionResult");
				break;

			case "finalLeaderboard":
				setLeaderboard(msg.leaderboard);
				setCurrentStatus("leaderboard");
				break;

			case "correctAnswers":
				setCorrectAnswers(msg.answers);
				setCurrentStatus("allWords");
				break;

			case "notify":
				switch (msg.notification) {
					case "showIntro":
						setCurrentStatus("ABC");
						break;

					case "showServiceInfos":
						setCurrentStatus("serviceInfos");
						break;

					case "showFinalBlank":
						setCurrentStatus("finalBlank");
						break;
				}
				break;

			default:
				break;
		}
	}, []);

	useEffect(() => {
		if (context.ws.val !== null) {
			context.ws.val.removeEventListener("message", wsMessageHandler);
			context.ws.val?.addEventListener("message", wsMessageHandler);
		} // eslint-disable-next-line
	}, [context.ws]);

	switch (currentStatus) {
		case "blankPage":
			return <PresenterTextPage text="" />;
		case "ABC":
			// return <PresenterTextPage text="Kahoot fatto in casa" />;
			return <PresenterTextPage text="ABC dell'animatore" />;
		case "serviceInfos":
			return (
				<PresenterTextPage
					text={[
						`Collegatevi al WiFi "${settings.wifi}"`,
						`(password: "${settings.pwd}")`,
						"Aprite un browser (Chrome, Safari, ...)",
						`Andate all'url "${settings.ip}:8100"`,
						`Cliccate "ENTRA" e registratevi`
					]}
					cornerText={`Utenti registrati: ${totUsers}`}
				/>
			);
		case "countdown":
			return <CountdownPage device="desktop" timeLeft={timer} />;
		case "question":
			return (
				<PresenterQuestionPage
					question={question}
					answers={answers}
					remainingTime={timer}
					submittedAnswers={numReplies}
					totalUsers={totUsers}
				/>
			);
		case "questionResult":
			return <PresenterResultPage answers={answers} correctVote={correctColor} votes={votesPerAnswer} />;
		case "leaderboard":
			return <PresenterRankingPage ranking={leaderboard} />;
		case "allWords":
			return <PresenterWordsRecap words={correcAnswers} />;
		case "finalBlank":
			return <PresenterTextPage text="" />;
	}
};

export default PresenterBehaviourPage;
