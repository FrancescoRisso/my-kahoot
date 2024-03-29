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
import settings from "../settings";
import PresenterBehaviourPage from "./PresenterBehaviourPage";

export interface ConnectionPageProps {
	userType: userTypes;
	testingButtons?: boolean;
}

const ConnectionPage = ({ userType, testingButtons }: ConnectionPageProps) => {
	const [connection, setConnection] = useState<"opening" | "accepted" | "refused">("opening");

	const [token, setToken] = useState<string | undefined>(undefined);

	const [username, setUsername] = useState<string>("");

	const context = useContext(Context);

	if (connection === "accepted") {
		if (testingButtons) return <TestingButtons userType={userType} />;
		else
			switch (userType) {
				case "admin":
					return <AdminBehaviourPage />;
				case "user":
					return <UserBehaviourPage username={username} setUsername={setUsername} />;
				case "presenter":
					return <PresenterBehaviourPage />;
			}
	}

	if (connection === "refused")
		switch (userType) {
			case "user":
				return <UserWaitingPage message="Non si può entrare a partita iniziata" />;
			case "admin":
			case "presenter":
				return <PresenterTextPage text="Partita già iniziata" screenFormat="16-9" />;
		}

	return (
		<IonPage>
			<IonContent color="light" className={userType === "user" ? "mobile" : "desktop"}>
				<div className="ion-text-center center-vertically">
					<IonButton
						onClick={() => {
							console.log("Connecting to the server");

							const ADDR = settings.ip;
							const PORT = 1234;
							const ws = new WebSocket(`ws://${ADDR}:${PORT}`);

							context.ws.set(ws);
							ws.addEventListener("open", () => {
								console.log("Connected");
							});

							const acceptConnection = () => {
								setConnection("accepted");
								const reply: messageToServer = { type: "userType", userType };
								ws.send(JSON.stringify(reply));
							};

							ws.addEventListener("message", (msg) => {
								const message: messageToClient = JSON.parse(msg.data);

								switch (message.type) {
									case "gameInProgress":
										setConnection("refused");
										break;

									case "tokenRequest":
										ws.send(JSON.stringify({ type: "tokenResponse", token } as messageToServer));
										break;

									case "tokenAssign":
										setToken(message.token);
										acceptConnection();
										break;

									case "tokenConfirm":
										acceptConnection();
										break;

									default:
										break;
								}

								if (["tokenAssign, tokenConfirm"].includes(message.type)) setConnection("accepted");
							});

							// setInterval(() => {
							// 	ws.send(JSON.stringify({ type: "ping" } as messageToServer));
							// }, 50 * 1000);

							// TODO
							ws.addEventListener("message", (ev: MessageEvent) => {
								const msg: messageToClient = JSON.parse(ev.data);
								console.debug(msg);
							});

							ws.addEventListener("close", () => {
								setConnection("opening");
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
