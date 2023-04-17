/*

description:
	
	
state:

hooks:
	
context:
	
*/

import { IonButton } from "@ionic/react";
import { AnswerColors } from "../../types";

export interface AnswerProps {
	text: string;
	color: AnswerColors;
}

const Answer = ({ text, color }: AnswerProps) => {
	return (
		<IonButton color={color} onClick={() => {}} className="no-caps ion-text-wrap fill-container">
			{text}
		</IonButton>
	);
};

export default Answer;
