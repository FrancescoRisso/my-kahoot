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
import { useMemo } from "react";
import OrderedList from "../components/OrderedList";
import { userLeaderboardValues } from "../../types";

export interface PresenterRankingPageProps {
	ranking: userLeaderboardValues[];
}

const PresenterRankingPage = ({ ranking }: PresenterRankingPageProps) => {
	const numSplits = useMemo(() => 2, []);

	return (
		<IonPage>
			<IonContent color="light">
				<IonGrid className="desktop h-100-percent ion-padding-start ion-padding-end">
					<IonRow className="h-15-percent ion-align-items-center">
						<p className="no-margin ion-text-center bigger w-100-percent">Classifica</p>
					</IonRow>
					<IonRow className="h-80-percent">
						<OrderedList
							bulletGenerator={(index: number) => {
								const position = ranking[index - 1].position;
								return (
									<>
										# {position < 10 ? <span className="text-transparent">0</span> : <></>}
										{position}
									</>
								);
							}}
							items={ranking.map(({ name, score }) => `${name} (${score} pt.)`)}
							numSplits={numSplits}
							separator=" - "
						/>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default PresenterRankingPage;
