import type { QuizStage } from "../types";

export default function ConfirmBtn({
	quizStage,
	setQuizStage,
}: {
	quizStage: QuizStage;
	setQuizStage: React.Dispatch<React.SetStateAction<QuizStage>>;
}) {
	return (
		<button
			onClick={() =>
				setQuizStage((quizStage) =>
					quizStage === "explanation" ? "reading" : "explanation"
				)
			}
		>
			{quizStage === "explanation" ? "Następne pytanie" : "Odpowiedz"}
		</button>
	);
}
