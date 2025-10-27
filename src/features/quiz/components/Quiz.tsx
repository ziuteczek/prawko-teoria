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
import type { QuizStage } from "../types";

export default function Quiz() {
	const redirect = useNavigate();
	const [searchParams] = useSearchParams();

	const currCategoryIDStr = searchParams.get("category_id");
	const quizCategoryID = Number(currCategoryIDStr);

	const { user } = useContext(AuthContext);
	const { preloadData } = useContext(PreloadContext);

	const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
	const [selectedAnswer, setSelectedAnswer] =
		useState<possibleCorrectAnswers | null>(null);

	const isFirstRun = useRef<boolean>(true);

	const [quizStage, setQuizStage] = useState<QuizStage>("reading");

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
	}, []);

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
				quizStage={quizStage}
				isVideoPlaying={isVideoPlaying}
				setIsVideoPlaying={setIsVideoPlaying}
			/>
			<p>{currQuestion.content}</p>
			<ConfirmBtn quizStage={quizStage} setQuizStage={setQuizStage} />
			<AnswersBtns
				answers={currQuestion.answers}
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				quizStage={quizStage}
				correctAnswer={currQuestion.correctAnswer}
			/>
			<p>Czas na {quizStage}</p>
			<Timer
				seconds={seconds}
				quizStage={quizStage}
				isVideoPlaying={isVideoPlaying}
			/>
		</>
	);
}
