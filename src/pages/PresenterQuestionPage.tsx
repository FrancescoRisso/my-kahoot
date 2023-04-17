/*

description:
	
	
state:
	- 
	
hooks:
	
context:
	
*/

import { ArrayOf4 } from "../../types";
import { useEffect, useState } from "react";
import AnswerCollection from "../components/AnswerCollection";
import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";

import { timerOutline } from "ionicons/icons";

export interface PresenterQuestionPageProps {}

const PresenterQuestionPage = () => {
	const [answers, setAnswers] = useState<ArrayOf4<string>>(["", "", "", ""]);
	const [time, setTime] = useState<number>(0);
	const [receivedAnswers, setreceivedAnswers] = useState<number>(0);
	const [totalUsers, settotalUsers] = useState<number>(0);

	useEffect(() => {
		setAnswers(["A", "B", "C", "D"]);
		setTime(12);
		setreceivedAnswers(21);
		settotalUsers(30);
	}, []);

	return (
		<div className="desktop h-100-percent">
			<IonGrid className="h-15-percent">
				<IonRow className="ion-align-items-center h-100-percent">
					<IonCol>
						<p className="ion-margin-end no-margin ion-padding-start">
							Risposte ricevute: {receivedAnswers}/{totalUsers}
						</p>
					</IonCol>
					<IonCol>
						<p className="ion-text-right bigger no-margin ion-padding-end">
							<IonIcon icon={timerOutline} /> {time}
						</p>
					</IonCol>
				</IonRow>
			</IonGrid>
			<h1 className="h-35-percent ion-text-center center-text-vertically no-margin">
				Un animatore dovrebbe essere...
			</h1>
			<AnswerCollection cssClasses="h-50-percent" answers={answers} answersPerRow={2} />
		</div>
	);
};

export default PresenterQuestionPage;
