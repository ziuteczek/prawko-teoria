import type { questionData } from "../features/quiz/types";

export interface questionAnswers {
	answerA: string;
	answerB: string;
	answerC: string;
}
export interface questionDataPromise extends questionData {
	media: Promise<Blob | null>;
}

export type possibleCorrectAnswers = "A" | "B" | "C" | "N" | "T";
