import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { PreloadContext } from "../../../context/preload";
import type {
	possibleCorrectAnswers,
	questionData,
} from "../../../types/questions.types";
import { AuthContext } from "../../../context/auth";
import QuestionsQueue from "../../../utils/questionQueue";
import MediaEl from "./MediaEl";
import ConfirmBtn from "./ConfirmBtn";
import AnswersBtns from "./AnswersBtns";

export default function Quiz() {
	const redirect = useNavigate();
	const [searchParams] = useSearchParams();

	const currCategoryIDStr = searchParams.get("category_id");
	const quizCategoryID = Number(currCategoryIDStr);

	const { user } = useContext(AuthContext);
	const { preloadData, setPreloadData } = useContext(PreloadContext);

	const [isAnswering, setIsAnswering] = useState<boolean>(true);
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
		correctAnswer: "N",
	});

	useEffect(() => {
		if (!user) {
			redirect("/");
			return;
		}

		if (!setPreloadData || !preloadData?.length) {
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

		if (currQuestion.mediaSrc) {
			URL.revokeObjectURL(currQuestion.mediaSrc);
		}

		setSelectedAnswer(null);
		
		questionsQueueRef.current
			.getQuestion()
			.then((newQuestion) => setCurrQuestion(newQuestion));
	}, [isAnswering]);

	useEffect(() => {
		isFirstRun.current = false;
	}, []);

	if (!user) {
		return null;
	}

	return (
		<>
			<MediaEl
				src={currQuestion.mediaSrc}
				mediaType={currQuestion.mediaType}
			/>
			<p>{currQuestion.content}</p>
			<ConfirmBtn
				isAnswering={isAnswering}
				setIsAnswering={setIsAnswering}
			/>
			<AnswersBtns
				answers={currQuestion.answers}
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				isAnswering={isAnswering}
			/>
		</>
	);
}
