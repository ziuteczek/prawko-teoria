import { Fragment, useEffect } from "react";
import type {
	possibleCorrectAnswers,
	questionAnswers,
} from "../../../types/questions.types";
import type { QuizStage } from "../types";

// const getAnswerStyle = (
// 	quizStage: QuizStage,
// 	elsAnswer: possibleCorrectAnswers,
// 	correctAnswer: possibleCorrectAnswers | undefined
// ) => {
// 	return {
// 		backgroundColor:
// 			quizStage === "explanation" && correctAnswer === elsAnswer
// 				? "green"
// 				: "",
// 	};
// };

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
	> | null;
	quizStage: QuizStage;
	correctAnswer: possibleCorrectAnswers | undefined;
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
		if (quizStage === "reading" && setSelectedAnswer) {
			setSelectedAnswer(null);
		}
	}, [setSelectedAnswer, quizStage]);

	return (
		<div className="flex justify-around px-20">
			{possibleAnswers.map(({ code, content }) => (
				<Fragment key={code}>
					<label
						className={`border px-20 py-5 border-gray-400 rounded cursor-pointer uppercase disabled:cursor-not-allowed text-xl text-black mt-5 transition-colors duration-300 ${
							quizStage === "explanation"
								? correctAnswer === code
									? "bg-lime-700 text-white" // Correct answer - green
									: selectedAnswer === code &&
									  selectedAnswer !== correctAnswer
									? "bg-rose-700 text-white" // Selected wrong answer - red
									: "bg-gray-300" // Other answers - neutral
								: selectedAnswer === code
								? "bg-blue-500 text-white" // Selected during answering
								: "bg-gray-300 hover:bg-gray-400" // Unselected during answering
						}`}
						htmlFor={code}
					>
						{content}
					</label>
					<input
						className="hidden"
						type="radio"
						name="answer"
						id={code}
						checked={selectedAnswer === code}
						disabled={quizStage === "explanation"}
						onChange={() => setSelectedAnswer && setSelectedAnswer(code)}
					/>
				</Fragment>
			))}
		</div>
	);
}
