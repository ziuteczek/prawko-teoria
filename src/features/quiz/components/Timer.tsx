import type { QuizStage } from "../types";

export default function Timer({
	seconds,
	quizStage,
	isVideoPlaying,
}: {
	seconds: number;
	quizStage: QuizStage;
	isVideoPlaying: boolean;
}) {
	return quizStage !== "explanation" ? <p>{isVideoPlaying ? 15 : seconds}</p> : <></>;
}
