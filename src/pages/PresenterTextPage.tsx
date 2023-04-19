/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	
*/

import { IonContent, IonPage } from "@ionic/react";

export interface PresenterTextPageProps {
	text: string | string[];
}

const PresenterTextPage = ({ text }: PresenterTextPageProps) => {
	return (
		<IonPage>
			<IonContent color="light" className="ion-text-center h-100-percent desktop">
				<div className="center-vertically">
					{typeof text === "string" ? (
						<p className="even-bigger no-margin">{text}</p>
					) : (
						text.map((phrase, index) => (
							<p key={index} className={`even-bigger ${ index===0 ? "no-margin" : "only-margin-top"}`}>
								{phrase}
							</p>
						))
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default PresenterTextPage;
