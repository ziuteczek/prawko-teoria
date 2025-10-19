import type { possibleCorrectAnswers, questionDataPromise } from "../../../types/questions.types";
import { getCloudMedia } from "../../../utils/getMedia";
import type { questionsRaw } from "../../../utils/questions";

export function getMediaType(src?: string | null): questionDataPromise["mediaType"] {
	if (src?.endsWith(".webp")) {
		return "image";
	} else if (src?.endsWith(".webm")) {
		return "video";
	} else {
		return "none";
	}
}

export default function promisifyQuestion(
	question: questionsRaw
): questionDataPromise {
	const questionPossibleAnswers = question.answerA
		? {
				answerA: question.answerA,
				answerB: question.answerB,
				answerC: question.answerC,
		  }
		: undefined;

	const {
		answerA,
		answerB,
		answerC,
		questionId,
		categoryId,
		...questionDataPromise
	} = {
		...question,
		questionID: question.questionId,
		categoryID: question.categoryId,
		media: getCloudMedia(question.media) as Promise<Blob>,
		mediaType: getMediaType(question.media),
		correctAnswer: question.correctAnswer as possibleCorrectAnswers,
		answers: questionPossibleAnswers,
	};

	return questionDataPromise;
}
