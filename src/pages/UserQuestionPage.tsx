/*

description:
	
	
state:
	- 
	
hooks:
	
context:
	
*/

import { AnswerColors, ArrayOf4 } from "../../types";
import { useEffect, useState } from "react";
import AnswerCollection from "../components/AnswerCollection";
import { IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow } from "@ionic/react";

import { timerOutline } from "ionicons/icons";

export interface PresenterQuestionPageProps {}

const UserQuestionPage = () => {
	const [answers, setAnswers] = useState<ArrayOf4<string>>(["", "", "", ""]);
	const [time, setTime] = useState<number>(0);
	const [username, setUsername] = useState<string>("");
	const [score, setScore] = useState<number>(0);
	const [answer, setAnswer] = useState<AnswerColors | null>(null);

	useEffect(() => {
		setAnswers(["A", "B", "C", "D"]);
		setTime(12);
		setUsername("Username");
		setScore(25);
	}, []);

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
								<IonIcon icon={timerOutline} /> {time}
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
