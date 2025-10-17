import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { PreloadContext } from "../../../context/preload";
import type {
	possibleCorrectAnswers,
	questionData,
} from "../../../types/questions.types";
import Question from "./Question";
import { AuthContext } from "../../../context/auth";
import QuestionsQueue from "../../../utils/questionQueue";
import Answer from "./Answer";

export default function Quiz() {
	const redirect = useNavigate();
	const [searchParams] = useSearchParams();

	const currCategoryIDStr = searchParams.get("category_id");
	const quizCategoryID = Number(currCategoryIDStr);

	const { user } = useContext(AuthContext);
	const { preloadData, setPreloadData } = useContext(PreloadContext);

	const [isAnswering, setIsAnswering] = useState<boolean>(false);
	const [selectedAnswer, setSelectedAnswer] =
		useState<possibleCorrectAnswers | null>(null);

	const questionsQueueRef = useRef<QuestionsQueue | null>(null);
	const isFirstRun = useRef<boolean>(true);

	const [currQuestion, setCurrQuestion] = useState<questionData>({
		questionID: 0,
		categoryID: 0,
		categoryName: "",
		content: "",
		mediaType: "none",
	});

	useEffect(() => {
		if (!setPreloadData || !preloadData?.length || !user) {
			return;
		}

		questionsQueueRef.current = new QuestionsQueue(
			user.id,
			quizCategoryID,
			preloadData
		);
		questionsQueueRef.current.updateQueque();

		setPreloadData([]);
	}, [preloadData]);

	useEffect(() => {
		if (!(questionsQueueRef.current instanceof QuestionsQueue)) {
			return;
		}

		if (isFirstRun.current) {
			questionsQueueRef.current
				.getQuestion()
				.then((newQuestion) => setCurrQuestion(newQuestion));
		}

		if (!isAnswering) {
			return;
		}

		questionsQueueRef.current
			.getQuestion()
			.then((newQuestion) => setCurrQuestion(newQuestion));
	}, [isAnswering]);

	useEffect(() => {
		isFirstRun.current = false;
	}, []);

	if (!user) {
		redirect("/");
		return null;
	}

	console.log(questionsQueueRef.current);

	return isAnswering ? (
		<Question
			questionData={currQuestion}
			isAnswering={isAnswering}
			setIsAnswering={setIsAnswering}
			selectedAnswer={selectedAnswer}
			setSelectedAnswer={setSelectedAnswer}
		/>
	) : (
		<Answer
			questionData={currQuestion}
			isAnswering={isAnswering}
			setIsAnswering={setIsAnswering}
		/>
	);
}
