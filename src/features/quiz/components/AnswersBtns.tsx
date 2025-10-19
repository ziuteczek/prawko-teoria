import React from "react";
import type {
	possibleCorrectAnswers,
	questionAnswers,
} from "../../../types/questions.types";

const getAnswerStyle = (
	isAnswering: boolean,
	elsAnswer: possibleCorrectAnswers,
	correctAnswer: possibleCorrectAnswers
) => {
	return {
		backgroundColor:
			!isAnswering && correctAnswer === elsAnswer ? "green" : "",
	};
};

export default function AnswersBtns({
	answers,
	selectedAnswer,
	setSelectedAnswer,
	isAnswering,
	correctAnswer,
}: {
	answers?: questionAnswers;
	selectedAnswer: possibleCorrectAnswers | null;
	setSelectedAnswer: React.Dispatch<
		React.SetStateAction<possibleCorrectAnswers | null>
	>;
	isAnswering: boolean;
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

	return possibleAnswers.map(({ code, content }) => (
		<React.Fragment key={code}>
			<label
				htmlFor={code}
				style={getAnswerStyle(isAnswering, code, correctAnswer)}
			>
				{content}
			</label>
			<input
				type="radio"
				name="answer"
				id={code}
				checked={selectedAnswer === code}
				disabled={!isAnswering}
				onChange={() => setSelectedAnswer(code)}
			/>
		</React.Fragment>
	));
}
