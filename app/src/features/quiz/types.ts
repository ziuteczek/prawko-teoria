import type { questionDataPromise } from "./utility/promisifyQuestion";

export interface questionData extends questionDataPromise {
	mediaSrc?: string;
}
export type QuizStage = "reading" | "answering" | "explanation";
