import { useCallback, useEffect, useRef, useState } from "react";
import type { questionData } from "../types";

import { type questionDataPromise } from "../utility/promisifyQuestion";
import QuestionQueue from "../utility/QuestionQueue";

export default function useQuestion(
	userID: string,
	categoryID: number,
	preloadedQuestions: questionDataPromise[] = []
) {
	const questionQueueData = useRef<questionData[]>([]);
	const questionQueueRef = useRef<QuestionQueue | null>(null);

	const [currQuestion, setCurrQuestion] = useState<questionData | null>(null);

	useEffect(() => {
		if (questionQueueRef.current) {
			return;
		}

		questionQueueRef.current = new QuestionQueue(
			userID,
			categoryID,
			preloadedQuestions
		);
	}, [categoryID, userID, preloadedQuestions]);

	useEffect(() => {
		questionQueueData.current = preloadedQuestions;
	}, [preloadedQuestions]);

	const nextQuestion = useCallback(async () => {
		if (!questionQueueRef.current) {
			return;
		}

		const nextQuestion = await questionQueueRef.current?.getNextQuestion(
			currQuestion ? [currQuestion.id] : []
		);

		console.log(questionQueueRef.current);
		setCurrQuestion(nextQuestion);
	}, [currQuestion]);

	return {
		currQuestion,
		nextQuestion,
	};
}
