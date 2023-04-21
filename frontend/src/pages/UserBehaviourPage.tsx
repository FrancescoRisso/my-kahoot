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
import { messageToServer, messageToClient, AnswerColors } from "../../types";
import { Context } from "../components/Context";
import UserLoginPage from "./UserRegisterPage";
import { IonAlert } from "@ionic/react";
import UserQuestionPage from "./UserQuestionPage";
import CountdownPage from "./CountdownPage";
import UserWaitingPage from "./UserWaitingPage";
import UserResultPage from "./UserResultPage";

export interface UserBehaviourPageProps {}

type validStatus = "selectUsername" | "waitForStart" | "countdown" | "question" | "questionResult";

const UserBehaviourPage = () => {
	const context = useContext(Context);

	const [currentStatus, setCurrentStatus] = useState<validStatus>("selectUsername");

	const [username, setUsername] = useState<string>("");
	const [usernameTaken, setUsernameTaken] = useState<boolean>(false);
	const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false);
	const [questions, setQuestions] = useState<Record<AnswerColors, string>>({
		red: "",
		green: "",
		yellow: "",
		blue: ""
	});
	const [timer, setTimer] = useState<number>(0);
	const [totScore, setTotScore] = useState<number>(0);
	const [roundScore, setRoundScore] = useState<number>(0);
	const [leaderboardPos, setLeaderboardPos] = useState<number>(0);

	const sendMessage = useCallback(
		(message: messageToServer) => {
			context.ws.val?.send(JSON.stringify(message));
		},
		[context.ws]
	);

	const wsMessageHandler = useCallback((ev: MessageEvent) => {
		const msg: messageToClient = JSON.parse(ev.data);

		switch (msg.type) {
			case "userRegister":
				if (msg.accepted) setCurrentStatus("waitForStart");
				else {
					setUsernameTaken(true);
					setUsernameInvalid(true);
				}
				break;

			case "usernameAvailable":
				setUsernameTaken(!msg.available);
				break;

			case "questions":
				setQuestions(msg.questions);
				setCurrentStatus("question");
				break;

			case "countdown":
				setTimer(msg.value);
				setCurrentStatus("countdown");
				break;

			case "timeLeft":
				setTimer(msg.value);
				break;

			case "userResult":
				setTotScore(msg.totScore);
				setRoundScore(msg.score);
				setLeaderboardPos(msg.position);
				setCurrentStatus("questionResult");
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
		case "selectUsername":
			return (
				<>
					<IonAlert
						isOpen={usernameInvalid}
						message="L'username scelto è già in uso"
						buttons={["OK"]}
						onDidDismiss={() => setUsernameInvalid(false)}
					></IonAlert>
					<UserLoginPage
						clickEvent={() => {
							sendMessage({ type: "userRegister", name: username });
						}}
						username={username}
						onUsernameChange={(newName: string) => {
							setUsername(newName);
							sendMessage({ type: "usernameAvailable", name: newName });
						}}
						usernameTaken={usernameTaken}
					/>
				</>
			);

		case "question":
			return (
				<UserQuestionPage
					answers={questions}
					clickEvent={(color: AnswerColors) => {
						sendMessage({ type: "userVote", vote: color });
					}}
					remainingTime={timer}
					score={totScore}
					username={username}
				/>
			);

		case "countdown":
			return <CountdownPage device="mobile" timeLeft={timer} />;

		case "waitForStart":
			return <UserWaitingPage message="Attendi che la partita inizi" spinner />;

		case "questionResult":
			return (
				<UserResultPage pos={leaderboardPos} thisScore={roundScore} totScore={totScore} username={username} />
			);
	}
};

export default UserBehaviourPage;
