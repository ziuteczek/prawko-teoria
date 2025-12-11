import type { QuizStage } from "../types";

export default function ConfirmBtn({
	quizStage,
	setQuizStage,
	enableBtn,
}: {
	quizStage: QuizStage;
	setQuizStage: React.Dispatch<React.SetStateAction<QuizStage>>;
	enableBtn: boolean;
}) {
	return (
		<div className="mt-3 flex justify-end">
			<button
				className="bg-blue-600 hover:bg-blue-800 duration-300 text-white py-2.5 px-5 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
				disabled={!enableBtn}
				onClick={() =>
					setQuizStage((quizStage) =>
						quizStage === "explanation" ? "reading" : "explanation"
					)
				}
			>
				{quizStage === "explanation"
					? "Następne pytanie →"
					: "Odpowiedz"}
			</button>
		</div>
	);
}
