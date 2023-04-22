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

export type implementedNotifications = "showIntro" | "showServiceInfos" | "showFinalBlank";

export type messageToServer =
	| { type: "userType"; userType: userTypes }
	| { type: "userRegister"; name: string }
	| { type: "usernameAvailable"; name: string }
	| { type: "userVote"; vote: AnswerColors }
	| { type: "startGame" }
	| { type: "nextQuestion" }
	| { type: "sendLeaderboard" }
	| { type: "sendCorrectAnswers"; to: userTypes }
	| { type: "requestNotify"; to: userTypes; notification: implementedNotifications };

export type messageToClient =
	| { type: "userRegister"; accepted: boolean }
	| { type: "gameInProgress" }
	| { type: "connectionAccepted" }
	| { type: "usernameAvailable"; available: boolean }
	| { type: "numReplies"; value: number }
	| { type: "gameStarted" }
	| { type: "question"; answers: Record<AnswerColors, string>; question: string }
	| { type: "countdown"; value: number }
	| { type: "timeLeft"; value: number }
	| { type: "userResult"; score: number; totScore: number; position: number }
	| { type: "allResults"; scores: Record<AnswerColors, number>; correctColor: AnswerColors }
	| { type: "lastQuestion" }
	| { type: "finalLeaderboard"; leaderboard: [string, number][] }
	| { type: "allAnswers"; answers: ArrayOf4<string>[] }
	| { type: "correctAnswers"; answers: string[] }
	| { type: "notify"; notification: implementedNotifications }
	| { type: "totUsers"; totUsers: number };
