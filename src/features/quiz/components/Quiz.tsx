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

	const [quizStage, setQuizStage] = useState<QuizStage>("reading");

	const { isFinished, seconds, reset, pause, resume } = useCountdown(15);
	const { currQuestion, nextQuestion } = useQuestion(
		user?.id || "",
		quizCategoryID,
		preloadData || []
	);

	const wasPlayingRef = useRef<boolean>(false);

	useEffect(() => {
		if (!user) {
			redirect("/");
		}
	}, [user, redirect]);

	useEffect(() => {
		if (!isFinished) return;

		setQuizStage((prev) => {
			if (prev === "reading") return "answering";
			if (prev === "answering") return "explanation";
			return "reading";
		});
	}, [isFinished]);

	useEffect(() => {
		if (quizStage === "reading") {
			reset(15);
			nextQuestion();
		} else if (quizStage === "answering") {
			reset(15);
		}
	}, [quizStage, nextQuestion, reset]);

	// Pause/resume only during reading. Move to "answering" when video finishes.
	useEffect(() => {
		if (quizStage !== "reading") {
			wasPlayingRef.current = isVideoPlaying;
			return;
		}

		if (isVideoPlaying) {
			reset();
			pause();
		} else {
			if (wasPlayingRef.current) {
				setQuizStage("answering");
			} else {
				resume();
			}
		}

		wasPlayingRef.current = isVideoPlaying;
	}, [isVideoPlaying, quizStage, pause, resume]);

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
			<Timer seconds={seconds} quizStage={quizStage} />
		</>
	);
}
