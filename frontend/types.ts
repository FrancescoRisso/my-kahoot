export type AnswerColors = "red" | "green" | "blue" | "yellow";

export type ArrayOf4<type> = [type, type, type, type];
export type ArrayOf3<type> = [type, type, type];

export type userTypes = "admin" | "presenter" | "user";

export type messageToServerTypes = "userType" | "userVote";
export type messageToServer = { type: "userType"; userType: userTypes } | { type: "userVote"; vote: AnswerColors };
