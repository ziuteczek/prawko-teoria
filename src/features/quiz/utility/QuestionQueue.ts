import { QUESTIONS_TO_QUEUE } from "../../../config/questions";
import getPendingQuestions from "../../../utils/questions";
import type { questionDataPromise } from "./promisifyQuestion";
import promisifyQuestion from "./promisifyQuestion";

export default class QuestionQueue {
	#userId: string;
	#categoryId: number;

	#data: questionDataPromise[] = [];
	#waitingForAnswers: number[] = [];

	#isQuestionLoading = false;

	constructor(
		userId: string,
		categoryId: number,
		preloadedQuestions?: questionDataPromise[]
	) {
		this.#userId = userId;
		this.#categoryId = categoryId;

		if (preloadedQuestions) {
			this.#data = preloadedQuestions;
		}
	}

	async #updateQueue(questionsToIgnore: number[] = []) {
		const questionsToQueue = QUESTIONS_TO_QUEUE - this.#data.length;

		if (this.#isQuestionLoading || questionsToQueue <= 0) {
			return;
		}

		this.#isQuestionLoading = true;

		const pendingQuestions = await getPendingQuestions(
			this.#userId,
			this.#categoryId,
			questionsToQueue,
			[
				...this.#data.map((q) => q.id),
				...questionsToIgnore,
				...this.#waitingForAnswers,
			]
		);

		const questions = pendingQuestions.map((q) => promisifyQuestion(q));

		this.#data = [...this.#data, ...questions];

		this.#isQuestionLoading = false;
	}

	confirmAnswering(id: number) {
		this.#waitingForAnswers = this.#waitingForAnswers.filter(
			(qId) => qId !== id
		);
	}

	async getNextQuestion(questionsToIgnore: number[] = []) {
		if (this.#data.length === 0) {
			await this.#updateQueue();
		}

		const questionsPromise = this.#data.map(
			(question) =>
				new Promise<questionDataPromise>((resolve) => {
					question.media.then(() => {
						resolve(question);
					});
				})
		);

		const questionMediaLoaded = await Promise.any(questionsPromise);

		this.#data = this.#data.filter((q) => questionMediaLoaded.id !== q.id);
		this.#waitingForAnswers = [
			...this.#waitingForAnswers,
			questionMediaLoaded.id,
		];

		const questionMedia = await questionMediaLoaded.media;
		const mediaSrc = questionMedia
			? URL.createObjectURL(questionMedia)
			: undefined;

		this.#updateQueue([...questionsToIgnore, questionMediaLoaded.id]);

		return { ...questionMediaLoaded, mediaSrc };
	}
}
