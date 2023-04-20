/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
imported into:
	- 
	
component dependences:
	- 
	
other dependences:
	- 
	
*/

import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { useState } from "react";

export interface ButtonWithVerificationProps {
	layout: "horizontal" | "vertical";
	onClickAction: () => void;
}

const ButtonWithVerification = ({ layout, onClickAction }: ButtonWithVerificationProps) => {
	const [safetyCheck, setSafetyCheck] = useState<boolean>(false);

	if (layout === "horizontal")
		return (
			<IonGrid className="h-100-percent">
				<IonRow className="h-50-percent">
					<IonCol className="ion-text-center">
						<IonButton
							className="center-vertically bigger-button"
							color={safetyCheck ? "green" : "danger"}
							onClick={() => {
								setSafetyCheck(true);
							}}
						>
							{safetyCheck ? "Go" : "Wait"}
						</IonButton>
					</IonCol>
					<IonCol className="ion-text-center">
						<IonButton
							className="center-vertically bigger-button"
							onClick={() => {
								if (safetyCheck) {
									setSafetyCheck(false);
									onClickAction();
								}
							}}
						>
							Avanti
						</IonButton>
					</IonCol>
				</IonRow>
			</IonGrid>
		);

	return (
		<IonGrid className="h-100-percent">
			<IonRow className="h-50-percent">
				<IonCol className="ion-text-center">
					<IonButton
						className="center-vertically bigger-button"
						color={safetyCheck ? "green" : "danger"}
						onClick={() => {
							setSafetyCheck(true);
						}}
					>
						{safetyCheck ? "Go" : "Wait"}
					</IonButton>
				</IonCol>
			</IonRow>
			<IonRow className="h-50-percent">
				<IonCol className="ion-text-center">
					<IonButton
						className="center-vertically bigger-button"
						onClick={() => {
							if (safetyCheck) {
								setSafetyCheck(false);
								onClickAction();
							}
						}}
					>
						Avanti
					</IonButton>
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default ButtonWithVerification;
