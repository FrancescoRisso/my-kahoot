/*

description:
	
state:

hooks:
	
context:
	
*/

import React, { useState } from "react";

import { ContextStructure } from "../../types";

export const Context = React.createContext({} as ContextStructure);

export interface ContextProps {
	// The element tree that will consume the context
	child: JSX.Element;
}

const ContextProvider = ({ child }: ContextProps) => {
	const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

	return (
		<Context.Provider
			value={{
				ws: { val: webSocket, set: setWebSocket }
			}}
		>
			{child}
		</Context.Provider>
	);
};

export default ContextProvider;
