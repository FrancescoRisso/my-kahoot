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
	nextAction: () => void;
	highlightedRow: number;
}

const AdminPage = ({ allWords, device, nextAction, highlightedRow }: AdminPageProps) => {
	if (device === "phone")
		return (
			<IonPage>
				<IonContent color="light">
					<div className="h-60-percent">
						<WordsTable allWords={allWords} highlight={highlightedRow} />
					</div>
					<div className="h-40-percent">
						<ButtonWithVerification
							layout="horizontal"
							onClickAction={() => {
								nextAction();
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
							<WordsTable allWords={allWords} highlight={highlightedRow} />
						</IonCol>
						<IonCol>
							<IonGrid className="h-100-percent">
								<ButtonWithVerification
									layout="vertical"
									onClickAction={() => {
										nextAction();
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
