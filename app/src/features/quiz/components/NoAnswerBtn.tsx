import type { Dispatch } from "react";
import type { QuizStage } from "../types";
import type { possibleCorrectAnswers } from "../../../types/questions.types";

export default function NoAnswerBtn({
	setQuizStage,
	setSelectedAnswer,
	quizStage,
}: {
	setQuizStage: Dispatch<QuizStage>;
	setSelectedAnswer: Dispatch<possibleCorrectAnswers | null>;
	quizStage: QuizStage;
}) {
	return quizStage !== "explanation" ? (
		<button
			onClick={() => {
				setQuizStage("explanation");
				setSelectedAnswer(null);
			}}
		>
			Brak odpowiedzi
		</button>
	) : (
		<></>
	);
}
