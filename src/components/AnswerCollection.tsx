/*

description:
	
	
state:
	
	
hooks:
	
	
context:
	
*/

import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { AnswerColors, ArrayOf4 } from "../../types";
import Answer from "./Answer";
import { useMemo } from "react";

export interface AnswerCollectionProps {
	answers: ArrayOf4<string>;
	answersPerRow: 1 | 2 | 4;
	cssClasses?: string;
	clickAction?: (color: AnswerColors) => void;
	selected: AnswerColors | null;
}

const AnswerCollection = ({
	answers,
	answersPerRow,
	cssClasses,
	clickAction,
	selected
}: AnswerCollectionProps) => {
	const colors: ArrayOf4<AnswerColors> = ["red", "blue", "yellow", "green"];
	const answersNumber = useMemo<number>(() => 4, []);
	const numRows = useMemo<number>(() => answersNumber / answersPerRow, [answersNumber, answersPerRow]);

	return (
		<IonGrid className={cssClasses ?? ""}>
			{Array.from(Array(numRows).keys()).map((rowNo) => (
				<IonRow key={rowNo} className={`h-${100 / numRows}-percent`}>
					{answers.slice(rowNo * answersPerRow, (rowNo + 1) * answersPerRow).map((answer, index) => (
						<IonCol key={index}>
							<Answer
								text={answer}
								color={colors[index + answersPerRow * rowNo]}
								clickAction={clickAction ?? undefined}
								disable={selected !== null}
								selected={selected === colors[index + answersPerRow * rowNo]}
							/>
						</IonCol>
					))}
				</IonRow>
			))}
		</IonGrid>
	);
};

export default AnswerCollection;
