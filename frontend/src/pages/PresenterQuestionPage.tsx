/*

description:
	
	
state:
	- 
	
hooks:
	
context:
	
*/

import { AnswerColors } from "../../types";
import AnswerCollection from "../components/AnswerCollection";
import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from "@ionic/react";

import { timerOutline } from "ionicons/icons";

export interface PresenterQuestionPageProps {
	answers: Record<AnswerColors, string>;
	remainingTime: number;
	submittedAnswers: number;
	totalUsers: number;
	question: string;
}

const PresenterQuestionPage = ({
	answers,
	remainingTime,
	submittedAnswers,
	totalUsers,
	question
}: PresenterQuestionPageProps) => {
	return (
		<IonPage>
			<IonContent className="desktop" color="light">
				<IonGrid className="h-15-percent">
					<IonRow className="ion-align-items-center h-100-percent">
						<IonCol>
							<p className="ion-margin-end no-margin ion-padding-start">
								Risposte ricevute: {submittedAnswers}/{totalUsers}
							</p>
						</IonCol>
						<IonCol>
							<p className="ion-text-right bigger no-margin ion-padding-end">
								<IonIcon icon={timerOutline} /> {remainingTime}
							</p>
						</IonCol>
					</IonRow>
				</IonGrid>
				<h1 className="h-35-percent ion-text-center center-text-vertically no-margin">{question}</h1>
				<AnswerCollection cssClasses="h-50-percent" answers={answers} answersPerRow={2} selected={null} />
			</IonContent>
		</IonPage>
	);
};

export default PresenterQuestionPage;
