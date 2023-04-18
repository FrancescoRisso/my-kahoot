/*

description:
	
	
state:
	- 
	
hooks:
	
context:
	
*/

import { AnswerColors } from "../../types";
import { useState } from "react";
import AnswerCollection from "../components/AnswerCollection";
import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from "@ionic/react";

import { timerOutline } from "ionicons/icons";

export interface PresenterQuestionPageProps {
	answers: Record<AnswerColors, string>
	remainingTime: number
	username: string
	score: number
}

const UserQuestionPage = ({answers, remainingTime, username, score}:PresenterQuestionPageProps) => {
	const [answer, setAnswer] = useState<AnswerColors | null>(null);

	return (
		<IonPage>
			<IonContent color="light" className="mobile">
				<IonGrid className="h-20-percent">
					<IonRow className="ion-align-items-center h-50-percent">
						<IonCol>
							<p className="no-margin ion-text-center">{username}</p>
						</IonCol>
					</IonRow>
					<IonRow className="ion-align-items-center h-50-percent">
						<IonCol>
							<p className="ion-margin-end bigger no-margin ion-padding-start">{score} pt</p>
						</IonCol>
						<IonCol>
							<p className="ion-text-right bigger no-margin ion-padding-end">
								<IonIcon icon={timerOutline} /> {remainingTime}
							</p>
						</IonCol>
					</IonRow>
				</IonGrid>
				<h1 className="h-30-percent ion-text-center center-text-vertically no-margin">
					Un animatore dovrebbe essere...
				</h1>
				<AnswerCollection
					cssClasses="h-50-percent"
					answers={answers}
					answersPerRow={2}
					clickAction={(color: AnswerColors) => {
						setAnswer(color);
					}}
					selected={answer}
				/>
			</IonContent>
		</IonPage>
	);
};

export default UserQuestionPage;
