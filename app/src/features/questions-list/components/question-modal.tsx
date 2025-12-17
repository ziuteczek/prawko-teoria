import { useEffect, useRef } from "react";
import type { questionRow } from "./page";
import { GOOGLE_CLOUD_URI } from "../../../config/cloud.storage";
import AiAssistance from "../../../app/components/AiAssistance";
import ExitIcon from "../assets/x.svg?react";
import AnswersBtns from "../../quiz/components/AnswersBtns";
import type { possibleCorrectAnswers } from "../../../types/questions.types";

function MediaPlayer({ mediaSrc }: { mediaSrc: string | null | undefined }) {
	if (mediaSrc?.endsWith(".webm")) {
		return <video src={GOOGLE_CLOUD_URI + mediaSrc} controls />;
	} else if (mediaSrc?.endsWith(".webp")) {
		return <img src={GOOGLE_CLOUD_URI + mediaSrc} alt="" />;
	} else {
		return <img></img>;
	}
}

export default function QuestionModalPresentation({
	question,

	setDisplayedQuestion,
}: {
	question: questionRow | null;
	setDisplayedQuestion: React.Dispatch<
		React.SetStateAction<questionRow | null>
	>;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (question) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [question]);

	if (!question) {
		return <></>;
	}

	const questionAnswers =
		question.answer_a && question.answer_b && question.answer_c
			? {
					answerA: question.answer_a,
					answerB: question.answer_b,
					answerC: question.answer_c,
			  }
			: undefined;

	return (
		<dialog
			className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] rounded border-gray-300 border"
			ref={dialogRef}
			onClose={() => setDisplayedQuestion(null)}
			onClick={(e) =>
				(e.target as HTMLDialogElement) === dialogRef.current &&
				dialogRef.current.close()
			}
		>
			<div className="relative px-5 py-10">
				<button
					className="text-red-500 cursor-pointer absolute -left-2 -top-2"
					onClick={() => setDisplayedQuestion(null)}
				>
					<ExitIcon className="max-w-15 max-h-15" />
				</button>
				<h3 className="font-bold">Pytanie:</h3>
				<p>{question?.content}</p>
				<MediaPlayer mediaSrc={question?.media} />
				<h3 className="font-bold">Możliwe odpowiedzi:</h3>
				<AnswersBtns
					answers={questionAnswers}
					selectedAnswer={
						question.correct_answer as possibleCorrectAnswers
					}
					quizStage="explanation"
					correctAnswer={
						question.correct_answer as possibleCorrectAnswers
					}
					setSelectedAnswer={null}
				/>
				<h3 className="font-bold">Wytłumaczenie:</h3>
				<p>{question.explanation}</p>
				<AiAssistance
					questionId={question.id}
					quizStage="explanation"
				/>
			</div>
		</dialog>
	);
}
