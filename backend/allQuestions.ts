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

const sameQuestion = "Un animatore dovrebbe essere...";

const realQuestions: question[] = [
	{
		question: sameQuestion,
		correct: "Autorevole",
		wrong: ["Autoritario", "Arrabbiato", "Automunito"]
	},
	{
		question: sameQuestion,
		correct: "Brillante",
		wrong: ["Bello", "Bro", "Bastonato"]
	},
	{
		question: sameQuestion,
		correct: "Chiaro & Conciso",
		wrong: ["Chitarrista", "Colto", "Chierichetto"]
	},
	{
		question: sameQuestion,
		correct: "Deciso",
		wrong: ["Dispettoso", "Distratto", "Defenestrato"]
	},
	{
		question: sameQuestion,
		correct: "Educatore",
		wrong: ["Egocentrico", "Effimero", "Enciclopedico"]
	},
	{
		question: sameQuestion,
		correct: "Fantasioso",
		wrong: ["Forte", "Frettoloso", "Fiorentino"]
	},
	{
		question: sameQuestion,
		correct: "Gentile",
		wrong: ["Giovane", "Goliardico", "Giallo"]
	},
	{
		question: sameQuestion,
		correct: "Ho poche idee...",
		wrong: ["Ho poche idee...", "Ho poche idee...", "Ho poche idee..."]
	},
	{
		question: sameQuestion,
		correct: "Intraprendente",
		wrong: ["Inutile", "Invidioso", "Immaginario"]
	},
	{
		question: sameQuestion,
		correct: "Jolly",
		wrong: ["Jolly", "Jolly", "Jolly"]
	},
	{
		question: sameQuestion,
		correct: "Ke ne so?",
		wrong: ["Ke ne so?", "Ke ne so?", "Ke ne so?"]
	},
	{
		question: sameQuestion,
		correct: "Leale",
		wrong: ["Lagnoso", "Latente", "Lottatore di sumo"]
	},
	{
		question: sameQuestion,
		correct: "Modello",
		wrong: ["Muto", "(il) Migliore", "Mangiapane a tradimento"]
	},
	{
		question: sameQuestion,
		correct: "Necessario",
		wrong: ["Noioso", "Nullafacente", "Nutellomane"]
	},
	{
		question: sameQuestion,
		correct: "Oggettivo",
		wrong: ["Ornamentale", "Occasionale", "Operti"]
	},
	{
		question: sameQuestion,
		correct: "Puntuale",
		wrong: ["Passivo", "Parassita", "Prete"]
	},
	{
		question: sameQuestion,
		correct: "Quale sarà?",
		wrong: ["Quale sarà?", "Quale sarà?", "Quale sarà?"]
	},
	{
		question: sameQuestion,
		correct: "Riferimento",
		wrong: ["Razzista", "Rimbambito", "Relitto"]
	},
	{
		question: sameQuestion,
		correct: "Severo (quando serve)",
		wrong: ["Sottomesso (ai bambini)", "Sempre sui social", "Scimpanzè"]
	},
	{
		question: sameQuestion,
		correct: "Tranquillo",
		wrong: ["Tonto", "Titubante", "Tanto"]
	},
	{
		question: sameQuestion,
		correct: "Utile",
		wrong: ["Universitario", "Utopistico", "Ustionato"]
	},
	{
		question: sameQuestion,
		correct: "Versatile/Veritiero",
		wrong: ["Vincitore", "Vegetale", "Vento"]
	},
	{
		question: sameQuestion,
		correct: "What?",
		wrong: ["What?", "What?", "What?"]
	},
	{
		question: sameQuestion,
		correct: "Xiamo quasi alla fine",
		wrong: ["Xiamo quasi alla fine", "Xiamo quasi alla fine", "Xiamo quasi alla fine"]
	},
	{
		question: sameQuestion,
		correct: "Yeee penultima lettera",
		wrong: ["Yeee penultima lettera", "Yeee penultima lettera", "Yeee penultima lettera"]
	},
	{
		question: sameQuestion,
		correct: "Zen",
		wrong: ["Zitto", "Zoologo", "Zorro"]
	}
];

export default tmpQuestions;
