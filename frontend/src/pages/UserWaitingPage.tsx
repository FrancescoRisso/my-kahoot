/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
*/

import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonPage, IonSpinner } from "@ionic/react";

export interface UserWaitingPageProps {
	message: string;
	spinner?: boolean;
}

const UserWaitingPage = ({ message, spinner }: UserWaitingPageProps) => {
	return (
		<IonPage>
			<IonContent color="light">
				<IonCard color="primary" className="center-vertically">
					<IonCardHeader>
						<IonCardTitle className="ion-margin">{message}</IonCardTitle>
					</IonCardHeader>
					{spinner && (
						<IonCardContent className="ion-text-center ion-margin-bottom">
							<IonSpinner name="circular" color="light" />
						</IonCardContent>
					)}
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default UserWaitingPage;
