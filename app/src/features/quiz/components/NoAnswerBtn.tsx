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
			className="bg-orange-400 uppercase text-white px-3 py-1.5 mb-3 hover:bg-orange-600 transition-colors duration-300 cursor-pointer"
		>
			Brak odpowiedzi
		</button>
	) : (
		<></>
	);
}
