import type { questionAnswers, possibleCorrectAnswers } from "../../types/questions.types";

export interface CountdownHook {
  seconds: number;
  isFinished: boolean;
  reset: (newSeconds?: number) => void;
}
export interface questionData {
	questionID: number;
	categoryID: number;
	categoryName: string;
	content: string;
	mediaType: "video" | "image" | "none";
	mediaSrc?: string;
	answers?: questionAnswers;
	correctAnswer: possibleCorrectAnswers;
}
export type QuizStage = "reading" | "answering" | "explanation";