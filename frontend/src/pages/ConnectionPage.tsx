/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 	
*/

import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useContext, useState } from "react";
import { messageToClient, messageToServer, userTypes } from "../../types";
import { Context } from "../components/Context";
import UserWaitingPage from "./UserWaitingPage";
import PresenterTextPage from "./PresenterTextPage";
import TestingButtons from "../components/TestingButtons";

export interface ConnectionPageProps {
	userType: userTypes;
	testingButtons?: boolean;
}

const ConnectionPage = ({ userType, testingButtons }: ConnectionPageProps) => {
	const [connection, setConnection] = useState<"opening" | "accepted" | "refused">("opening");

	const context = useContext(Context);

	// Temporary tests to check functionality of the server
	if (connection === "accepted") {
		if (testingButtons) return <TestingButtons userType={userType} />;
		else {
			return <></>;
		}
	}

	if (connection === "refused")
		switch (userType) {
			case "user":
				return <UserWaitingPage message="Non si può entrare a partita iniziata" />;
			case "admin":
			case "presenter":
				return <PresenterTextPage text="Partita già iniziata" />;
		}

	return (
		<IonPage>
			<IonContent color="light">
				<div className="ion-text-center center-vertically">
					<IonButton
						onClick={() => {
							console.log("Connecting to the server");

							const ADDR = "localhost";
							const PORT = 1234;
							const ws = new WebSocket(`ws://${ADDR}:${PORT}`);

							context.ws.set(ws);
							ws.addEventListener("open", () => {
								const message: messageToServer = { type: "userType", userType };
								ws.send(JSON.stringify(message));
								console.debug(JSON.stringify(message));
							});

							ws.addEventListener("message", (msg) => {
								const message: messageToClient = JSON.parse(msg.data);
								if (message.type === "connectionAccepted") setConnection("accepted");
								if (message.type === "gameInProgress") setConnection("refused");
							});

							// TODO
							ws.addEventListener("message", (msg) => console.debug(JSON.parse(msg.data)));
						}}
					>
						Entra
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default ConnectionPage;
