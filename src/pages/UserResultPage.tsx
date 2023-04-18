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
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonContent,
	IonGrid,
	IonPage,
	IonRow
} from "@ionic/react";

export interface UserResultPageProps {
	thisScore: number;
	totScore: number;
	pos: number;
	username: string;
}

const UserResultPage = ({ thisScore, totScore, pos, username }: UserResultPageProps) => {
	return (
		<IonPage>
			<IonContent color="light">
				<IonGrid className="mobile h-100-percent">
					<IonRow className="ion-align-items-center h-15-percent">
						<IonCol>
							<p className="no-margin ion-text-center bigger">Risultati round</p>
							<p className="no-margin-bottom ion-text-center">{username}</p>
						</IonCol>
					</IonRow>
					<IonRow className="ion-align-items-center h-85-percent">
						<IonCol className="h-100-percent">
							<IonGrid className="h-100-percent justify-elements-vertically ion-padding-bottom">
								<IonRow>
									<IonCol>
										<IonCard color="tertiary">
											<IonCardHeader>
												<IonCardTitle>Questo round hai totalizzato:</IonCardTitle>
											</IonCardHeader>
											<IonCardContent className="bigger ion-padding-start ion-margin-start">
												{thisScore} pt.
											</IonCardContent>
										</IonCard>
									</IonCol>
								</IonRow>
								{/* <br /> */}
								<IonRow>
									<IonCol>
										<IonCard color="primary">
											<IonCardHeader>
												<IonCardTitle>In totale hai:</IonCardTitle>
											</IonCardHeader>
											<IonCardContent className="bigger ion-padding-start ion-margin-start">
												{totScore} pt.
											</IonCardContent>
										</IonCard>
									</IonCol>
								</IonRow>
								{/* <br /> */}
								<IonRow>
									<IonCol>
										<IonCard color="secondary">
											<IonCardHeader>
												<IonCardTitle>In classifica sei:</IonCardTitle>
											</IonCardHeader>
											<IonCardContent className="bigger ion-padding-start ion-margin-start">
												# {pos}
											</IonCardContent>
										</IonCard>
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default UserResultPage;
