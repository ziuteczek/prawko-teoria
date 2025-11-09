import type {
	possibleCorrectAnswers,
	questionsRaw,
} from "../../../types/questions.types";
import { getCloudMedia } from "../../../utils/getMedia";

type mediaTypes = "image" | "video" | "none";

export function getMediaType(src?: string | null): mediaTypes {
	if (src?.endsWith(".webp")) {
		return "image";
	} else if (src?.endsWith(".webm")) {
		return "video";
	} else {
		return "none";
	}
}

export default function promisifyQuestion(question: questionsRaw) {
	const questionPossibleAnswers = question.answerA
		? {
				answerA: question.answerA,
				answerB: question.answerB,
				answerC: question.answerC,
		  }
		: undefined;

	const {
		/* eslint-disable */
		answerA: _,
		answerB: __,
		answerC: ___,
		...questionPromisified
		/* eslint-enable */
	} = {
		...question,
		media: getCloudMedia(question.media) as Promise<Blob>,
		mediaType: getMediaType(question.media),
		correctAnswer: question.correctAnswer as possibleCorrectAnswers,
		answers: questionPossibleAnswers,
	};

	return questionPromisified;
}
export type questionDataPromise = ReturnType<typeof promisifyQuestion>;
