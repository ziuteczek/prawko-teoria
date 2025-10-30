import React, { useEffect } from "react";
import type {
	possibleCorrectAnswers,
	questionAnswers,
} from "../../../types/questions.types";
import type { QuizStage } from "../types";

const getAnswerStyle = (
	quizStage: QuizStage,
	elsAnswer: possibleCorrectAnswers,
	correctAnswer: possibleCorrectAnswers
) => {
	return {
		backgroundColor:
			quizStage === "explanation" && correctAnswer === elsAnswer
				? "green"
				: "",
	};
};

export default function AnswersBtns({
	answers,
	selectedAnswer,
	setSelectedAnswer,
	quizStage,
	correctAnswer,
}: {
	answers?: questionAnswers;
	selectedAnswer: possibleCorrectAnswers | null;
	setSelectedAnswer: React.Dispatch<
		React.SetStateAction<possibleCorrectAnswers | null>
	>;
	quizStage: QuizStage;
	correctAnswer: possibleCorrectAnswers;
}) {
	const possibleAnswersCodes: possibleCorrectAnswers[] = answers
		? ["A", "B", "C"]
		: ["T", "N"];
	const possibleAnswersContent = answers
		? [answers.answerA, answers.answerB, answers.answerC]
		: ["Tak", "Nie"];

	const possibleAnswers = possibleAnswersCodes.map((code, i) => ({
		content: possibleAnswersContent[i],
		code,
	}));

	useEffect(() => {
		if (quizStage === "reading") {
			setSelectedAnswer(null);
		}
	}, [setSelectedAnswer, quizStage]);

	return possibleAnswers.map(({ code, content }) => (
		<React.Fragment key={code}>
			<label
				htmlFor={code}
				style={getAnswerStyle(quizStage, code, correctAnswer)}
			>
				{content}
			</label>
			<input
				type="radio"
				name="answer"
				id={code}
				checked={selectedAnswer === code}
				disabled={quizStage === "explanation"}
				onChange={() => setSelectedAnswer(code)}
			/>
		</React.Fragment>
	));
}
