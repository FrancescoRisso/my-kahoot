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
	device: "desktop" | "mobile";
}

const PresenterCountdownPage = ({ timeLeft, device }: PresenterCountdownPageProps) => {
	return (
		<IonPage>
			<IonContent color="light">
				<p className={`very-very-big ion-text-center center-vertically no-margin ${device}`}>{timeLeft}</p>
			</IonContent>
		</IonPage>
	);
};

export default PresenterCountdownPage;
