import type { QuizStage } from "../types";
import "../animations/progress-bar.css";

export default function Timer({
	seconds,
	quizStage,
	isPaused,
}: {
	seconds: number;
	quizStage: QuizStage;
	isPaused: boolean;
}) {
	if (quizStage === "explanation") {
		return <></>;
	}

	return (
		<div className="relative overflow-hidden border border-gray-400 w-full">
			{/* Prograss bar hider */}
			<p className="text-center">{seconds}</p>
			<div
				className={`bg-white absolute top-0 left-0 bottom-0 right-0 ${isPaused || "progress-bar-hider"} -z-10`}
			></div>
		</div>
	);
}
