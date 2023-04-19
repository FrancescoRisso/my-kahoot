/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
*/

import { IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import OrderedList from "../components/OrderedList";

export interface PresenterWordsRecapProps {
	words: string[];
}

const PresenterWordsRecap = ({ words }: PresenterWordsRecapProps) => {
	return (
		<IonPage>
			<IonContent color="light">
				<IonGrid className="desktop h-100-percent ion-padding-start ion-padding-end">
					<IonRow className="h-20-percent ion-align-items-center">
						<p className="no-margin ion-text-center bigger w-100-percent">Recap delle parole</p>
					</IonRow>
					<IonRow className="h-80-percent ion-padding-bottom">
						<OrderedList
							items={words}
							bulletGenerator={(index) => ""}
							separator=""
							numSplits={3}
						/>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default PresenterWordsRecap;
