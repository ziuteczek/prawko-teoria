import { useEffect, useRef, useState } from "react";
import type { questionData } from "../types";
import type { questionDataPromise } from "../../../types/questions.types";
import { QUESTIONS_TO_QUEUE } from "../../../config/questions";
import { getPendingQuestions } from "../../../utils/questions";
import promisifyQuestion from "../utility/promisifyQuestion";

export default function useQuestion(
	userID: string,
	categoryID: number,
	preloadedQuestions: questionDataPromise[] = []
) {
	const questionQueueData = useRef<questionDataPromise[]>([]);
	const isQuestionLoading = useRef<boolean>(false);

	const [currQuestion, setCurrQuestion] = useState<questionData>({
		questionID: 0,
		categoryID: 0,
		categoryName: "",
		content: "",
		mediaType: "none",
		correctAnswer: "N",
	});

	useEffect(() => {
		if (preloadedQuestions) {
			questionQueueData.current = preloadedQuestions;
		}
	}, []);

	const updateQueque = async () => {
		//prettier-ignore
		const questionsToQueue = QUESTIONS_TO_QUEUE - questionQueueData.current.length;

		if (isQuestionLoading.current || questionsToQueue <= 0) {
			return;
		}

		isQuestionLoading.current = true;

		const pendingQuestions = await getPendingQuestions(
			userID,
			categoryID,
			questionsToQueue,
			questionQueueData.current.map((q) => q.questionID)
		);

		const questions = pendingQuestions.map((q) => promisifyQuestion(q));
		questionQueueData.current = [
			...questionQueueData.current,
			...questions,
		];

		isQuestionLoading.current = false;
	};

	const nextQuestion = async (): Promise<void> => {
		const questionsPromise = questionQueueData.current.map(
			(question) =>
				new Promise<questionDataPromise>(async (resolve) => {
					await question.media;
					resolve(question);
				})
		);

		const questionMediaLoaded = await Promise.any(questionsPromise);

		//prettier-ignore
		const questionMediaLoadedIndex = questionQueueData.current.indexOf(questionMediaLoaded);
		const lastQuestionIndex = questionQueueData.current.length - 1;

		{
			[
				questionQueueData.current[questionMediaLoadedIndex],
				questionQueueData.current[lastQuestionIndex],
			] = [
				questionQueueData.current[lastQuestionIndex],
				questionQueueData.current[questionMediaLoadedIndex],
			];
		}
		questionQueueData.current.pop();

		const { media, ...question } = {
			...questionMediaLoaded,
		};

		const questionMedia = await questionMediaLoaded.media;

		if (questionMedia) {
			question.mediaSrc = URL.createObjectURL(questionMedia);
		} else {
			question.mediaSrc = undefined;
		}

		updateQueque();

		setCurrQuestion(question);
	};

	return {
		currQuestion,
		nextQuestion,
	};
}
