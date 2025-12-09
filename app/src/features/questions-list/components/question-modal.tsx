import { useEffect, useRef } from "react";
import type { questionRow } from "./page";
import { GOOGLE_CLOUD_URI } from "../../../config/cloud.storage";
import AiAssistance from "../../../app/components/AiAssistance";

function MediaPlayer({ mediaSrc }: { mediaSrc: string | null | undefined }) {
	if (mediaSrc?.endsWith(".webm")) {
		return <video src={GOOGLE_CLOUD_URI + mediaSrc} />;
	} else if (mediaSrc?.endsWith(".webp")) {
		return <img src={GOOGLE_CLOUD_URI + mediaSrc} alt="" />;
	} else {
		return <img></img>;
	}
}

function QuestionAnswers({ question }: { question: questionRow }) {
	const { answer_a, answer_b, answer_c } = question;

	if (answer_a && answer_b && answer_c) {
		return (
			<>
				<button
					className={`disabled cursor-pointer ${
						question.correct_answer === "A" && "bg-green-500"
					}`}
				>
					{question.answer_a}
				</button>
				<button
					className={`disabled cursor-pointer ${
						question.correct_answer === "B" && "bg-green-500"
					}`}
				>
					{question.answer_b}
				</button>
				<button
					className={`disabled cursor-pointer ${
						question.correct_answer === "C" && "bg-green-500"
					}`}
				>
					{question.answer_c}
				</button>
			</>
		);
	}

	return (
		<>
			<button
				className={`disabled cursor-pointer ${
					question.correct_answer === "T" && "bg-green-500"
				}`}
			>
				Tak
			</button>
			<button
				className={`disabled cursor-pointer ${
					question.correct_answer === "N" && "bg-green-500"
				}`}
			>
				Nie
			</button>
		</>
	);
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

	return (
		<dialog
			className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
			ref={dialogRef}
			onClose={() => setDisplayedQuestion(null)}
			onClick={(e) =>
				(e.target as HTMLDialogElement) === dialogRef.current &&
				dialogRef.current.close()
			}
		>
			<div>
				<button
					className="text-red-500 cursor-pointer"
					onClick={() => setDisplayedQuestion(null)}
				>
					X
				</button>
				<p>{question?.content}</p>
				<MediaPlayer mediaSrc={question?.media} />
				<QuestionAnswers question={question} />
				<p>{question.explanation}</p>
				<AiAssistance questionId={question.id} quizStage="explanation"/>
			</div>
		</dialog>
	);
}
