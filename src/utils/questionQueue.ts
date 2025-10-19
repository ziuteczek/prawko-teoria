import { getPendingQuestions, type questionsRaw } from "./questions";
import { QUESTIONS_TO_QUEUE } from "../config/questions";
import type {
	possibleCorrectAnswers,
	questionData,
	questionDataPromise,
} from "../types/questions.types";
import { getCloudMedia } from "./getMedia";

export default class QuestionsQueue {
	#data: questionDataPromise[] = [];
	#currentlyLoadingQuestions = false;
	#userID: string;
	#categoryID: number;

	static getMediaType(src?: string | null): questionDataPromise["mediaType"] {
		if (src?.endsWith(".webp")) {
			return "image";
		} else if (src?.endsWith(".webm")) {
			return "video";
		} else {
			return "none";
		}
	}

	static promisifyQuestion(question: questionsRaw): questionDataPromise {
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
			mediaType: this.getMediaType(question.media),
			correctAnswer: question.correctAnswer as possibleCorrectAnswers,
			answers: questionPossibleAnswers,
		};

		return questionDataPromise;
	}

	async getQuestion(): Promise<questionData> {
		const questionsPromise = this.#data.map(
			(question) =>
				new Promise<questionDataPromise>(async (resolve) => {
					await question.media;
					resolve(question);
				})
		);

		const questionMediaLoaded = await Promise.any(questionsPromise);

		const questionMediaLoadedIndex =
			this.#data.indexOf(questionMediaLoaded);
		const lastQuestionIndex = this.#data.length - 1;

		{
			[
				this.#data[questionMediaLoadedIndex],
				this.#data[lastQuestionIndex],
			] = [
				this.#data[lastQuestionIndex],
				this.#data[questionMediaLoadedIndex],
			];
		}
		this.#data.pop();

		const { media, ...question } = {
			...questionMediaLoaded,
		};

		const questionMedia = await questionMediaLoaded.media;

		if (questionMedia) {
			question.mediaSrc = URL.createObjectURL(questionMedia);
		} else {
			question.mediaSrc = undefined;
		}

		this.updateQueque();

		return question;
	}

	async updateQueque() {
		const questionsToQueue = QUESTIONS_TO_QUEUE - this.#data.length;

		if (this.#currentlyLoadingQuestions || questionsToQueue <= 0) {
			return;
		}

		this.#currentlyLoadingQuestions = true;

		const pendingQuestions = await getPendingQuestions(
			this.#userID,
			this.#categoryID,
			questionsToQueue,
			this.#data.map((q) => q.questionID)
		);

		const questions = pendingQuestions.map((q) =>
			QuestionsQueue.promisifyQuestion(q)
		);
		this.#data = [...this.#data, ...questions];

		this.#currentlyLoadingQuestions = false;
	}

	constructor(
		userID: string,
		categoryID: number,
		preloadedQuestions?: questionDataPromise[]
	) {
		this.#userID = userID;
		this.#categoryID = categoryID;

		if (preloadedQuestions) {
			this.#data = preloadedQuestions;
		}

		this.updateQueque();
	}
}
