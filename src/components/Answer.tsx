/*

description:
	
	
state:

hooks:
	
context:
	
*/

import { IonButton } from "@ionic/react";
import { AnswerColors } from "../../types";
import { useState } from "react";

export interface AnswerProps {
	text: string;
	color: AnswerColors;
	disable?: boolean;
	clickAction?: (color: AnswerColors) => void;
	selected?: boolean;
}

const Answer = ({ text, color, disable, clickAction, selected }: AnswerProps) => {
	return (
		<IonButton
			color={color}
			onClick={() => {
				clickAction?.(color);
			}}
			className={`no-caps ion-text-wrap fill-container ${selected ? "disabled-opaque" : ""}`}
			disabled={disable ?? false}
		>
			{text}
		</IonButton>
	);
};

export default Answer;
