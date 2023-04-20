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
import { AnswerColors } from "../../types";
import AnswerCollection from "../components/AnswerCollection";
import VoteGraph from "../components/VoteGraph";

export interface PresenterResultPageProps {
	votes: Record<AnswerColors, number>;
	correctVote: AnswerColors;
	answers: Record<AnswerColors, string>;
}

const PresenterResultPage = ({ votes, correctVote, answers }: PresenterResultPageProps) => {
	return (
		<IonPage>
			<IonContent className="desktop" color="light">
				<div className="h-60-percent ion-text-center center-text-vertically no-margin">
					<VoteGraph votes={votes} />
				</div>
				<AnswerCollection
					cssClasses="h-40-percent"
					answers={answers}
					answersPerRow={2}
					selected={correctVote}
				/>
			</IonContent>
		</IonPage>
	);
};

export default PresenterResultPage;
