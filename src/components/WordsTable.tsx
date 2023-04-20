/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
	
*/

import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { ArrayOf4 } from "../../types";

export interface WordsTableProps {
	allWords: ArrayOf4<string>[];
}

const WordsTable = ({ allWords }: WordsTableProps) => {
	return (
		<IonGrid className="h-100-percent scroll-y">
			{allWords.map((row, index) => (
				<IonRow key={index} className="border-bottom">
					{row.map((word, index) => (
						<IonCol key={index}>{word}</IonCol>
					))}
				</IonRow>
			))}
		</IonGrid>
	);
};

export default WordsTable;
