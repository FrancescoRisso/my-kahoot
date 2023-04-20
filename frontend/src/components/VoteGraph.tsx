/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
*/

import { useMemo } from "react";
import { AnswerColors } from "../../types";
import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import colors from "../util/colorsArray";

export interface VoteGraphProps {
	votes: Record<AnswerColors, number>;
}

const VoteGraph = ({ votes }: VoteGraphProps) => {
	const maxVote = useMemo(() => Math.max(...Object.values(votes)), [votes]);

	return (
		<IonGrid className="h-100-percent large-padding">
			<IonRow className="h-80-percent">
				{colors.map((color) => (
					<IonCol key={color} className="">
						<IonButton
							className={`graph-col-width disabled-opaque align-bottom`}
							style={{ height: `${(100 * votes[color]) / maxVote}%` }}
							color={color}
							disabled
						></IonButton>
					</IonCol>
				))}
			</IonRow>
			<IonRow className="h-20-percent ion-margin-top">
				{colors.map((color) => (
					<IonCol key={color} className="">
						<IonButton
							className={`smaller graph-col-width h-100-percent disabled-opaque align-bottom`}
							color={color}
							disabled
						>
							{votes[color]}
						</IonButton>
					</IonCol>
				))}
			</IonRow>
		</IonGrid>
	);
};

export default VoteGraph;
