import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { PreloadContext } from "../../../context/preload";
import type { possibleCorrectAnswers } from "../../../types/questions.types";
import { AuthContext } from "../../../context/auth";
import MediaEl from "./MediaEl";
import ConfirmBtn from "./ConfirmBtn";
import AnswersBtns from "./AnswersBtns";
import { useCountdown } from "../hooks/Countdown";
import Timer from "./Timer";
import useQuestion from "../hooks/Question";

export default function Quiz() {
	const redirect = useNavigate();
	const [searchParams] = useSearchParams();

	const currCategoryIDStr = searchParams.get("category_id");
	const quizCategoryID = Number(currCategoryIDStr);

	const { user } = useContext(AuthContext);
	const { preloadData } = useContext(PreloadContext);

	const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
	const [isAnswering, setIsAnswering] = useState<boolean>(true);
	const [selectedAnswer, setSelectedAnswer] =
		useState<possibleCorrectAnswers | null>(null);

	const isFirstRun = useRef<boolean>(true);
	const [questionStage, setQuestionStage] = useState<"reading" | "answering">(
		"reading"
	);

	const { isFinished, seconds, reset, pause } = useCountdown(15);
	const { currQuestion, nextQuestion } = useQuestion(
		user?.id || "",
		quizCategoryID,
		preloadData || []
	);

	useEffect(() => {
		if (!user) {
			redirect("/");
		}

		if (!isAnswering) {
			return;
		}

		if (currQuestion.mediaSrc) {
			URL.revokeObjectURL(currQuestion.mediaSrc);
		}

		reset(15);
		setSelectedAnswer(null);
		setQuestionStage("reading");

		nextQuestion();
	}, [isAnswering]);

	useEffect(() => {
		if (isFirstRun.current) {
			return;
		}

		if (questionStage === "reading") {
			reset(15);
			setQuestionStage("answering");
		}
		if (questionStage === "answering") {
			setIsAnswering(false);
		}
	}, [isFinished]);

	useEffect(() => {
		if (!isVideoPlaying) {
			reset(15);
			return;
		}

		if (questionStage === "reading") {
			pause();
			setQuestionStage("answering");
		}
	}, [isVideoPlaying]);

	useEffect(() => {
		console.log(isVideoPlaying);
	}, [isVideoPlaying]);

	useEffect(() => {
		isFirstRun.current = false;
	}, []);

	return (
		<>
			<MediaEl
				src={currQuestion.mediaSrc}
				mediaType={currQuestion.mediaType}
				isAnswering={isAnswering}
				isVideoPlaying={isVideoPlaying}
				setIsVideoPlaying={setIsVideoPlaying}
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
				correctAnswer={currQuestion.correctAnswer}
			/>
			{isAnswering ? <p>Czas na {questionStage}</p> : <></>}
			<Timer seconds={seconds} isAnswering={isAnswering} isVideoPlaying={isVideoPlaying} />
		</>
	);
}
