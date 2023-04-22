import { ArrayOf3 } from "../frontend/types";

export interface question {
	question: string;
	correct: string;
	wrong: ArrayOf3<string>;
}

const tmpQuestions: question[] = [
	{ question: "Quale operazione è corretta?", correct: "1+1=2", wrong: ["1+1=0", "1+1=1", "1+1=3"] },
	{ question: "Quale operazione è corretta?", correct: "2*2=4", wrong: ["3*2=9", "5*4=15", "2*2=8"] },
	{ question: "Quale operazione è corretta?", correct: "1-1=0", wrong: ["11-10=0", "1-0=0", "0-1=3"] },
	{ question: "Quale operazione è corretta?", correct: "6/2=3", wrong: ["6/2=4", "6/2=2", "8/4=3"] }
];

export default tmpQuestions;
