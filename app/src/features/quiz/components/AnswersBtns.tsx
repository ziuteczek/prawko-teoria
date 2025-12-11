import { Fragment, useEffect } from "react";
import type {
	possibleCorrectAnswers,
	questionAnswers,
} from "../../../types/questions.types";
import type { QuizStage } from "../types";


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
		if (quizStage === "reading") {
			setSelectedAnswer(null);
		}
	}, [setSelectedAnswer, quizStage]);

	return (
		<div className="flex justify-around px-20">
			{possibleAnswers.map(({ code, content }) => (
				<Fragment key={code}>
					<label
						className={`border px-20 py-5 border-gray-400 rounded cursor-pointer uppercase text-xl text-black mt-5 ${
							selectedAnswer === code
								? "bg-blue-500"
								: "bg-gray-300"
						} ${
							quizStage === "explanation" &&
							correctAnswer === code &&
							"bg-green-600"
						} ${
							selectedAnswer !== correctAnswer &&
							code !== correctAnswer &&
							quizStage === "explanation" &&
							"bg-red-700"
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
						onChange={() => setSelectedAnswer(code)}
					/>
				</Fragment>
			))}
		</div>
	);
}
