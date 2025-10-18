import React from "react";
import type {
	possibleCorrectAnswers,
	questionAnswers,
} from "../../../types/questions.types";

export default function AnswersBtns({
	answers,
	selectedAnswer,
	setSelectedAnswer,
	isAnswering,
}: {
	answers?: questionAnswers;
	selectedAnswer: possibleCorrectAnswers | null;
	setSelectedAnswer: React.Dispatch<
		React.SetStateAction<possibleCorrectAnswers | null>
	>;
	isAnswering: boolean;
}) {
	if (!answers) {
		return (
			<>
				<label htmlFor="T">Tak</label>
				<input
					type="radio"
					name="answer"
					id="T"
					checked={selectedAnswer === "T"}
					disabled={!isAnswering}
					onChange={() => setSelectedAnswer("T")}
				/>
				<label htmlFor="N">Nie</label>
				<input
					type="radio"
					name="answer"
					id="N"
					disabled={!isAnswering}
					checked={selectedAnswer === "N"}
					onChange={() => setSelectedAnswer("N")}
				/>
			</>
		);
	}
	const { answerA, answerB, answerC } = answers;
	return (
		<>
			<label htmlFor="A">{answerA}</label>
			<input
				type="radio"
				name="answer"
				id="A"
				disabled={!isAnswering}
				checked={selectedAnswer === "A"}
				onChange={() => setSelectedAnswer("A")}
			/>
			<label htmlFor="B">{answerB}</label>
			<input
				type="radio"
				name="answer"
				id="B"
				disabled={!isAnswering}
				checked={selectedAnswer === "B"}
				onChange={() => setSelectedAnswer("B")}
			/>
			<label htmlFor="C">{answerC}</label>
			<input
				type="radio"
				name="answer"
				id="C"
				disabled={!isAnswering}
				checked={selectedAnswer === "C"}
				onChange={() => setSelectedAnswer("C")}
			/>
		</>
	);
}
