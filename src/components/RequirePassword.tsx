/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
*/

import { useRef, useState } from "react";

export interface RequirePasswordProps {
	password: string;
	content: JSX.Element;
}

const RequirePassword = ({ password, content }: RequirePasswordProps) => {
	const pwdBox = useRef<HTMLInputElement>(null);
	const [pwdCorrect, setPwdCorrect] = useState<boolean>(false);

	if (pwdCorrect) return content;
	return (
		<>
			<input type="password" ref={pwdBox}></input>
			<button
				onClick={() => {
					setPwdCorrect(pwdBox?.current?.value === password);
				}}
			>
				Vai
			</button>
		</>
	);
};

export default RequirePassword;
