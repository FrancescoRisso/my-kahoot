/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
imported into:
	- 
	
component dependences:
	- 
	
other dependences:
	- 
	
*/

import { IonButton } from "@ionic/react";
import { messageToServer, userTypes } from "../../types";
import { useContext } from "react";
import { Context } from "./Context";

export interface TestingButtonsProps {
	userType: userTypes;
}

const TestingButtons = ({ userType }: TestingButtonsProps) => {
	const context = useContext(Context);

	return (
		<>
			<p>{userType}</p>
			<IonButton
				onClick={() => {
					const msg: messageToServer = { type: "userRegister", name: "pippo" };
					context.ws.val?.send(JSON.stringify(msg));
				}}
			>
				Registra pippo
			</IonButton>
			<IonButton
				onClick={() => {
					const msg: messageToServer = { type: "userRegister", name: "pluto" };
					context.ws.val?.send(JSON.stringify(msg));
				}}
			>
				Registra pluto
			</IonButton>
			<IonButton
				onClick={() => {
					const msg: messageToServer = { type: "usernameAvailable", name: "pippo" };
					context.ws.val?.send(JSON.stringify(msg));
				}}
			>
				Pippo è libero?
			</IonButton>
			<IonButton
				onClick={() => {
					const msg: messageToServer = { type: "userVote", vote: "yellow" };
					context.ws.val?.send(JSON.stringify(msg));
				}}
			>
				Vota giallo
			</IonButton>
			<IonButton
				onClick={() => {
					const msg: messageToServer = { type: "userVote", vote: "green" };
					context.ws.val?.send(JSON.stringify(msg));
				}}
			>
				Vota verde
			</IonButton>
			<IonButton
				onClick={() => {
					const msg: messageToServer = { type: "startGame" };
					context.ws.val?.send(JSON.stringify(msg));
				}}
			>
				Inizia partita
			</IonButton>
			<IonButton
				onClick={() => {
					const msg: messageToServer = { type: "nextQuestion" };
					context.ws.val?.send(JSON.stringify(msg));
				}}
			>
				Prossima domanda
			</IonButton>
			<IonButton
				onClick={() => {
					console.clear();
				}}
			>
				Clear console
			</IonButton>
			<IonButton
				onClick={() => {
					const msg: messageToServer = { type: "sendLeaderboard" };
					context.ws.val?.send(JSON.stringify(msg));
				}}
			>
				Manda leaderboard
			</IonButton>
			<IonButton
				onClick={() => {
					const msg: messageToServer = { type: "sendCorrectAnswers", to: "presenter" };
					context.ws.val?.send(JSON.stringify(msg));
				}}
			>
				Manda risposte corrette
			</IonButton>
		</>
	);
};

export default TestingButtons;
