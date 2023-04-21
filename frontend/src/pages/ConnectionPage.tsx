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
import AdminBehaviourPage from "./AdminBehaviourPage";
import UserBehaviourPage from "./UserBehaviourPage";
import ip from "../getIp";

export interface ConnectionPageProps {
	userType: userTypes;
	testingButtons?: boolean;
}

const ConnectionPage = ({ userType, testingButtons }: ConnectionPageProps) => {
	const [connection, setConnection] = useState<"opening" | "accepted" | "refused">("opening");

	const context = useContext(Context);

	if (connection === "accepted") {
		if (testingButtons) return <TestingButtons userType={userType} />;
		else
			switch (userType) {
				case "admin":
					return <AdminBehaviourPage />;
				case "user":
					return <UserBehaviourPage />;
				default:
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
			<IonContent color="light" className={userType === "user" ? "mobile" : "desktop"}>
				<div className="ion-text-center center-vertically">
					<IonButton
						onClick={() => {
							console.log("Connecting to the server");

							const ADDR = ip;
							const PORT = 1234;
							const ws = new WebSocket(`ws://${ADDR}:${PORT}`);

							context.ws.set(ws);
							ws.addEventListener("open", () => {
								console.log("Connected");
								const message: messageToServer = { type: "userType", userType };
								ws.send(JSON.stringify(message));
							});

							ws.addEventListener("message", (msg) => {
								const message: messageToClient = JSON.parse(msg.data);
								if (message.type === "connectionAccepted") setConnection("accepted");
								if (message.type === "gameInProgress") setConnection("refused");
							});

							// TODO
							ws.addEventListener("message", (ev: MessageEvent) => {
								const msg: messageToClient = JSON.parse(ev.data);
								console.debug(msg);
							});
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
