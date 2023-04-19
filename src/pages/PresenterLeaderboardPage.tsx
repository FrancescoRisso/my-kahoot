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
import { useMemo } from "react";

export interface PresenterRankingPageProps {
	ranking: string[];
}

const PresenterRankingPage = ({ ranking }: PresenterRankingPageProps) => {
	const numSplits = useMemo(() => 2, []);
	const split = useMemo(() => Math.ceil(ranking.length / numSplits), [ranking, numSplits]);

	return (
		<IonPage>
			<IonContent color="light">
				<IonGrid className="desktop h-100-percent ion-padding-start ion-padding-end">
					<IonRow className="h-15-percent ion-align-items-center">
						<p className="no-margin ion-text-center bigger w-100-percent">Classifica</p>
					</IonRow>
					<IonRow className="h-80-percent">
						{Array.from(Array(numSplits).keys()).map((colNo) => (
							<IonCol key={colNo} className="justify-elements-vertically">
								{ranking.slice(colNo * split, (colNo + 1) * split).map((user, index) => {
									const pos = index + 1 + colNo * split;
									return (
										<p className="no-margin" key={pos}>
											# {pos < 10 ? <span className="text-transparent">0</span> : <></>}
											{pos} - {user}
										</p>
									);
								})}
							</IonCol>
						))}
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default PresenterRankingPage;
