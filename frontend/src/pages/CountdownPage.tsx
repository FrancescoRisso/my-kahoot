/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
*/

import { IonContent, IonPage } from "@ionic/react";

export interface PresenterCountdownPageProps {
	timeLeft: number;
	device: "desktop-16-9" | "desktop-4-3" | "mobile";
}

const CountdownPage = ({ timeLeft, device }: PresenterCountdownPageProps) => {
	return (
		<IonPage>
			<IonContent color="light">
				<p className={`very-very-big ion-text-center center-vertically no-margin ${device}`}>{timeLeft}</p>
			</IonContent>
		</IonPage>
	);
};

export default CountdownPage;
