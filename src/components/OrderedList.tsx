/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
*/

import { IonCol } from "@ionic/react";

export interface OrderedListProps {
	items: string[];
	separator: string;
	bulletGenerator: (index: number) => string | JSX.Element;
	numSplits: number;
	splitsSize: number;
}

const OrderedList = ({ items, separator, bulletGenerator, numSplits, splitsSize }: OrderedListProps) => {
	return (
		<>
			{Array.from(Array(numSplits).keys()).map((colNo) => (
				<IonCol key={colNo} className="justify-elements-vertically">
					{items.slice(colNo * splitsSize, (colNo + 1) * splitsSize).map((item, index) => {
						const pos = index + 1 + colNo * splitsSize;
						return (
							<p className="no-margin" key={pos}>
								{bulletGenerator(pos)}
								{separator}
								{item}
							</p>
						);
					})}
				</IonCol>
			))}
		</>
	);
};

export default OrderedList;
