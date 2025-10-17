import React from "react";
import type {
	possibleCorrectAnswers,
	questionAnswers,
	questionData,
} from "../../../types/questions.types";
import ConfirmBtn from "./ConfirmBtn";
import MediaEl from "./MediaEl";



function AnswersBtns({
	answers,
	selectedAnswer,
	setSelectedAnswer,
}: {
	answers?: questionAnswers;
	selectedAnswer: possibleCorrectAnswers | null;
	setSelectedAnswer: React.Dispatch<
		React.SetStateAction<possibleCorrectAnswers | null>
	>;
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
					onChange={() => setSelectedAnswer("T")}
				/>
				<label htmlFor="N">Nie</label>
				<input
					type="radio"
					name="answer"
					id="N"
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
				checked={selectedAnswer === "A"}
				onChange={() => setSelectedAnswer("A")}
			/>
			<label htmlFor="B">{answerB}</label>
			<input
				type="radio"
				name="answer"
				id="B"
				checked={selectedAnswer === "B"}
				onChange={() => setSelectedAnswer("B")}
			/>
			<label htmlFor="C">{answerC}</label>
			<input
				type="radio"
				name="answer"
				id="C"
				checked={selectedAnswer === "C"}
				onChange={() => setSelectedAnswer("C")}
			/>
		</>
	);
}

export default function Question({
	questionData,
	isAnswering,
	setIsAnswering,
	selectedAnswer,
	setSelectedAnswer,
}: {
	questionData: questionData;
	isAnswering: boolean;
	setIsAnswering: React.Dispatch<React.SetStateAction<boolean>>;
	selectedAnswer: possibleCorrectAnswers | null;
	setSelectedAnswer: React.Dispatch<
		React.SetStateAction<possibleCorrectAnswers | null>
	>;
}) {
	const { content, mediaSrc, mediaType, answers } = questionData;

	return (
		<>
			<MediaEl src={mediaSrc} mediaType={mediaType} />
			<p>{content}</p>
			<AnswersBtns
				answers={answers}
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
			/>
			<ConfirmBtn
				isAnswering={isAnswering}
				setIsAnswering={setIsAnswering}
			/>
		</>
	);
}
