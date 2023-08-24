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
	screenFormat: "16-9" | "4-3";
}

const PresenterTextPage = ({ text, cornerText, screenFormat }: PresenterTextPageProps) => {
	return (
		<IonPage>
			<IonContent color="light" className={`ion-text-center h-100-percent desktop-${screenFormat}`}>
				{cornerText && (
					<div className="h-15-percent ion-text-start ion-padding-start">
						<p className="no-margin center-vertically">{cornerText}</p>
					</div>
				)}
				<div className={cornerText ? "h-85-percent" : "h-100-percent"}>
					<div className="padding-vertical h-100-percent justify-elements-vertically">
					{typeof text === "string" ? (
							<p className="even-bigger center-vertically no-margin">{text}</p>
						) : (
							text.map((phrase, index) => (
								<p
									key={index}
									className={`even-bigger no-margin`}
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
