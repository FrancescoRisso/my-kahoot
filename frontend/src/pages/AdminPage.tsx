/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
*/

import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { ArrayOf4 } from "../../types";
import WordsTable from "../components/WordsTable";
import ButtonWithVerification from "../components/ButtonWithVerification";

export interface AdminPageProps {
	allWords: ArrayOf4<string>[];
	device: "phone" | "tablet";
}

const AdminPage = ({ allWords, device }: AdminPageProps) => {
	if (device === "phone")
		return (
			<IonPage>
				<IonContent color="light">
					<div className="h-60-percent">
						<WordsTable allWords={allWords} />
					</div>
					<div className="h-40-percent">
						<ButtonWithVerification
							layout="horizontal"
							onClickAction={() => {
								console.debug("Ciao");
							}}
						/>
					</div>
				</IonContent>
			</IonPage>
		);

	return (
		<IonPage>
			<IonContent color="light">
				<IonGrid className="h-100-percent">
					<IonRow className="h-100-percent">
						<IonCol className="h-100-percent" size="9">
							<WordsTable allWords={allWords} />
						</IonCol>
						<IonCol>
							<IonGrid className="h-100-percent">
								<ButtonWithVerification
									layout="vertical"
									onClickAction={() => {
										console.debug("Ciao");
									}}
								/>
							</IonGrid>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default AdminPage;
