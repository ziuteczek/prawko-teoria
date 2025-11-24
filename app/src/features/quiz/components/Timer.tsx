import type { QuizStage } from "../types";

export default function Timer({
	seconds,
	quizStage,
}: {
	seconds: number;
	quizStage: QuizStage;
}) {
	return quizStage !== "explanation" ? <p>{seconds}</p> : <></>;
}
