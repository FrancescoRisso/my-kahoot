/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
*/

import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { ArrayOf4 } from "../../types";
import { useRef } from "react";

export interface AdminPageProps {
	allWords: ArrayOf4<string>[];
}

const AdminPage = ({ allWords }: AdminPageProps) => {
	const verifyBox = useRef<HTMLIonCheckboxElement>(null);

	return (
		<IonPage>
			<IonContent color="light">
				<IonGrid className="h-60-percent scroll-y">
					{allWords.map((row, index) => (
						<IonRow key={index} className="border-bottom">
							{row.map((word, index) => (
								<IonCol key={index}>{word}</IonCol>
							))}
						</IonRow>
					))}
				</IonGrid>
				<IonGrid className="h-40-percent">
					<IonRow className="h-50-percent">
						<IonCol className="ion-text-center">
							<IonCheckbox className="bigger-checkbox center-vertically" ref={verifyBox}>
								Sicura
							</IonCheckbox>
						</IonCol>
						<IonCol className="ion-text-center">
							<IonButton
								className="center-vertically bigger-button"
								onClick={() => {
									if (verifyBox.current?.checked) {
										verifyBox.current.checked = false;
										console.debug("Ok");
									}
								}}
							>
								Avanti
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default AdminPage;
