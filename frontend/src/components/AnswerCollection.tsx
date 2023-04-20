/*

description:
	
	
state:
	
	
hooks:
	
	
context:
	
*/

import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { AnswerColors } from "../../types";
import Answer from "./Answer";
import { useMemo } from "react";
import colors from "../util/colorsArray";

export interface AnswerCollectionProps {
	answers: Record<AnswerColors, string>;
	answersPerRow: 1 | 2 | 4;
	cssClasses?: string;
	clickAction?: (color: AnswerColors) => void;
	selected: AnswerColors | null;
}

const AnswerCollection = ({ answers, answersPerRow, cssClasses, clickAction, selected }: AnswerCollectionProps) => {
	const answersNumber = useMemo<number>(() => 4, []);
	const numRows = useMemo<number>(() => answersNumber / answersPerRow, [answersNumber, answersPerRow]);

	return (
		<IonGrid className={cssClasses ?? ""}>
			{Array.from(Array(numRows).keys()).map((rowNo) => (
				<IonRow key={rowNo} className={`h-${100 / numRows}-percent`}>
					{colors.slice(rowNo * answersPerRow, (rowNo + 1) * answersPerRow).map((color, index) => (
						<IonCol key={index}>
							<Answer
								text={answers[color]}
								color={color}
								clickAction={clickAction ?? undefined}
								disable={selected !== null}
								selected={selected === color}
							/>
						</IonCol>
					))}
				</IonRow>
			))}
		</IonGrid>
	);
};

export default AnswerCollection;
