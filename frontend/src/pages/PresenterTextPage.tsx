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
	cornerText?: string;
}

const PresenterTextPage = ({ text, cornerText }: PresenterTextPageProps) => {
	return (
		<IonPage>
			<IonContent color="light" className="ion-text-center h-100-percent desktop">
				{cornerText && (
					<div className="h-10-percent ion-text-start ion-padding-start">
						<p className="no-margin center-vertically">{cornerText}</p>
					</div>
				)}
				<div className={cornerText ? "h-90-percent" : "h-100-percent"}>
					<div className="center-vertically">
						{typeof text === "string" ? (
							<p className="even-bigger no-margin">{text}</p>
						) : (
							text.map((phrase, index) => (
								<p
									key={index}
									className={`even-bigger ${index === 0 ? "no-margin" : "only-margin-top"}`}
								>
									{phrase}
								</p>
							))
						)}
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default PresenterTextPage;
