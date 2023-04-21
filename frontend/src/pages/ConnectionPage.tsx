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

import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useContext, useState } from "react";
import { messageToServer, userTypes } from "../../types";
import { Context } from "../components/Context";

export interface ConnectionPageProps {
	userType: userTypes;
}

const ConnectionPage = ({ userType }: ConnectionPageProps) => {
	const [connected, setConnected] = useState<boolean>(false);

	const context = useContext(Context);

	// Temporary tests to check functionality of the server
	if (connected)
		return (
			<>
				<IonButton
					onClick={() => {
						context.ws.val?.send(JSON.stringify({ type: "userRegister", name: "pippo" }));
					}}
				>
					Registra pippo
				</IonButton>
				<IonButton
					onClick={() => {
						context.ws.val?.send(JSON.stringify({ type: "userRegister", name: "pluto" }));
					}}
				>
					Registra pluto
				</IonButton>
				<IonButton
					onClick={() => {
						context.ws.val?.send(JSON.stringify({ type: "usernameAvailable", name: "pippo" }));
					}}
				>
					Pippo è libero?
				</IonButton>
			</>
		);

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

							// TODO
							ws.addEventListener("message", (msg) => console.debug(JSON.parse(msg.data)));

							setConnected(true);
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
