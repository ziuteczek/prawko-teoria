// import type { questionData } from "../features/quiz/types";
import type getPendingQuestions from "../utils/questions";


export interface questionAnswers {
	answerA: string;
	answerB: string;
	answerC: string;
}
// export interface questionDataPromise extends questionData {
// 	media: Promise<Blob | null>;
// }

export type possibleCorrectAnswers = "A" | "B" | "C" | "N" | "T";

export type questionsRaw = Awaited<
	ReturnType<typeof getPendingQuestions>
>[number];
