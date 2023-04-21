/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
*/

import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonContent,
	IonGrid,
	IonIcon,
	IonInput,
	IonItem,
	IonPage,
	IonRow,
	IonText
} from "@ionic/react";
import { checkmarkOutline, closeOutline } from "ionicons/icons";

export interface UserLoginPageProps {
	username: string;
	onUsernameChange: (newName: string) => void;
	usernameTaken: boolean;
	clickEvent: () => void;
}

const UserLoginPage = ({ username, onUsernameChange, usernameTaken, clickEvent }: UserLoginPageProps) => {
	return (
		<IonPage>
			<IonContent color="light" className="mobile">
				<IonCard color="primary" className="center-vertically">
					<IonCardHeader>
						<IonCardTitle>Scegli uno username:</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<IonItem>
							<IonInput
								type="text"
								value={username}
								placeholder="Username"
								color="primary"
								label=""
								onInput={(e) => {
									onUsernameChange(e.currentTarget.value?.toString() ?? "");
								}}
							></IonInput>
						</IonItem>
						<IonText className={`${username === "" ? "text-transparent" : ""}`}>
							<IonIcon icon={!usernameTaken ? checkmarkOutline : closeOutline} />
							<small className="smaller">
								{usernameTaken ? "Questo username è già usato" : "Questo username sembra libero"}
							</small>
						</IonText>
						<IonGrid className="ion-text-center">
							<IonRow>
								<IonCol>
									<IonButton color="primary" onClick={clickEvent} disabled={username === ""}>
										Entra
									</IonButton>
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default UserLoginPage;
