export type AnswerColors = "red" | "green" | "blue" | "yellow";

export interface StateVariable<type> {
	val: type;
	set: (newVal: type) => void;
}

export type ArrayOf4<type> = [type, type, type, type];
export type ArrayOf3<type> = [type, type, type];

export type userTypes = "admin" | "presenter" | "user";

export type StorageKeys = "ws";

export interface ContextStructure {
	ws: StateVariable<WebSocket | null>;
}

export interface StorageConnection {
	storeValue: (key: StorageKeys, val: any) => void;
	getValue: (key: StorageKeys) => any;
	clearAll: () => void;
	isOk: boolean;
}

export type messageToServerTypes = "userType" | "userVote" | "userRegister";
export type messageToServer =
	| { type: "userType"; userType: userTypes }
	| { type: "userRegister"; name: string }
	| { type: "userVote"; vote: AnswerColors };

export type messageToClient =
	| { type: "userRegister"; accepted: true }
	| { type: "userRegister"; accepted: false; reason: "gameInProgress" | "usernameAlreadyTaken" };
