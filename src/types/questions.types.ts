export interface questionAnswers {
	answerA?: string;
	answerB?: string;
	answerC?: string;
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
export interface questionDataPromise extends questionData {
	media: Promise<Blob | null>;
}

export type possibleCorrectAnswers = "A" | "B" | "C" | "N" | "T";
