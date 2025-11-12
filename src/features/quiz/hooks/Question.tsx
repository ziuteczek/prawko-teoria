import { useCallback, useEffect, useRef, useState } from "react";
import type { questionData } from "../types";

import { type questionDataPromise } from "../utility/promisifyQuestion";
import QuestionQueue from "../utility/QuestionQueue";
import supabase from "../../../utils/supabase";

export default function useQuestion(
	userId: string,
	categoryID: number,
	preloadedQuestions: questionDataPromise[] = []
) {
	const questionQueueData = useRef<questionData[]>([]);
	const questionQueueRef = useRef<QuestionQueue | null>(null);

	const [currQuestion, setCurrQuestion] = useState<questionData | null>(null);
	const currQuestionRef = useRef<questionData | null>(null);

	useEffect(() => {
		currQuestionRef.current = currQuestion;
	}, [currQuestion]);

	useEffect(() => {
		if (questionQueueRef.current) {
			return;
		}

		questionQueueRef.current = new QuestionQueue(
			userId,
			categoryID,
			preloadedQuestions
		);
	}, [categoryID, userId, preloadedQuestions]);

	useEffect(() => {
		questionQueueData.current = preloadedQuestions;
	}, [preloadedQuestions]);

	const nextQuestion = useCallback(
		async (usersAnswer: string) => {
			if (!questionQueueRef.current) {
				return;
			}

			if (currQuestionRef.current) {
				const questionId = currQuestionRef.current.id;

				const { error } = await supabase.rpc("upsert_answer", {
					p_answer: usersAnswer,
					p_profile_id: userId,
					p_question_id: questionId,
				});

				if (error) {
					return { error };
				}

				questionQueueRef.current.confirmAnswering(questionId);
			}

			const nextQuestion =
				await questionQueueRef.current?.getNextQuestion();

			setCurrQuestion(nextQuestion);
		},
		[userId]
	);

	return {
		currQuestion,
		nextQuestion,
	};
}
