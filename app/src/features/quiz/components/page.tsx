import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { PreloadContext } from "../../../context/preload.context";
import type { possibleCorrectAnswers } from "../../../types/questions.types";
import AuthContext from "../../../context/auth.context";
import MediaEl from "./MediaEl";
import ConfirmBtn from "./ConfirmBtn";
import AnswersBtns from "./AnswersBtns";
import { useCountdown } from "../hooks/Countdown";
import Timer from "./Timer";
import useQuestion from "../hooks/Question";
import type { QuizStage } from "../types";
import NoAnswerBtn from "./NoAnswerBtn";
import AiAssistance from "../../../app/components/AiAssistance";

export default function Quiz() {
	const redirect = useNavigate();
	const [searchParams] = useSearchParams();

	const currCategoryIDStr = searchParams.get("category_id");
	const quizCategoryID = Number(currCategoryIDStr);

	const { user } = useContext(AuthContext);
	const { preloadData, setPreloadData } = useContext(PreloadContext);

	const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
	const [selectedAnswer, setSelectedAnswer] =
		useState<possibleCorrectAnswers | null>(null);
	const selectedAnswerRef = useRef<possibleCorrectAnswers | null>(null);

	const [quizStage, setQuizStage] = useState<QuizStage>("reading");

	const { isFinished, seconds, reset, pause, resume, isPaused } =
		useCountdown(15);
	const { currQuestion, nextQuestion } = useQuestion(
		user?.id || "",
		quizCategoryID,
		preloadData?.filter((q) => q.categoryId === quizCategoryID) || []
	);

	const wasPlayingRef = useRef<boolean>(false);

	useEffect(() => {
		if (!user) {
			redirect("/");
		}
	}, [user, redirect]);

	useEffect(() => {
		selectedAnswerRef.current = selectedAnswer;
	}, [selectedAnswer]);

	useEffect(() => {
		if (!isFinished) return;

		setQuizStage((prev) => {
			if (prev === "reading") return "answering";
			if (prev === "answering") return "explanation";
			return "explanation";
		});
	}, [isFinished]);

	useEffect(() => {
		if (quizStage === "reading") {
			reset(15);
			nextQuestion(selectedAnswerRef.current || "").then((result) => {
				if (result?.error) {
					console.error("Error sending an answer", result.error);
				}
			});
		} else if (quizStage === "answering") {
			reset(15);
		}
	}, [quizStage, reset, nextQuestion]);

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
	}, [isVideoPlaying, quizStage, pause, resume, reset]);

	useEffect(() => {
		if (setPreloadData) {
			setPreloadData([]);
		}
	}, [setPreloadData]);

	const quizStageToString = (quizStage: QuizStage) => {
		switch (quizStage) {
			case "answering":
				return "odpowiedź";
			case "explanation":
				return "tłumaczenie";
			case "reading":
				return "zapoznanie";
			default:
				return "";
		}
	};

	return (
		<div className="p-5">
			<div className="flex gap-5">
				<MediaEl
					src={currQuestion?.mediaSrc}
					mediaType={currQuestion?.mediaType || "none"}
					quizStage={quizStage}
					isVideoPlaying={isVideoPlaying}
					setIsVideoPlaying={setIsVideoPlaying}
				/>
				<div className="flex flex-col justify-between">
					<div>
						<h1 className="text-xl font-extrabold">{currQuestion?.content}</h1>

						<h2 className="font-extralight mt-3">Wytłumaczenie:</h2>
						<p>{quizStage === "explanation" && currQuestion?.explanation}</p>
					</div>

					<div className="flex flex-col items-end">
						<NoAnswerBtn
							quizStage={quizStage}
							setQuizStage={setQuizStage}
							setSelectedAnswer={setSelectedAnswer}
						/>
						<p className="lowercase w-full">
							Czas na {quizStageToString(quizStage)}
						</p>
						<Timer seconds={seconds} quizStage={quizStage} isPaused={isPaused} />
					</div>
				</div>
			</div>
			<ConfirmBtn
				quizStage={quizStage}
				setQuizStage={setQuizStage}
				enableBtn={!!selectedAnswer || quizStage === "explanation"}
			/>
			<AnswersBtns
				answers={currQuestion?.answers}
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				quizStage={quizStage}
				correctAnswer={currQuestion?.correctAnswer}
			/>
			<AiAssistance questionId={currQuestion?.id} quizStage={quizStage} />
		</div>
	);
}
