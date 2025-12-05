import { useEffect, useRef } from "react";
import type { questionRow } from "./page";

export default function QuestionModalPresentation({
	question,

	setDisplayedQuestion,
}: {
	question: questionRow | null;
	setDisplayedQuestion: React.Dispatch<
		React.SetStateAction<questionRow | null>
	>;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (question) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [question]);

	return (
		<dialog ref={dialogRef}>
			<button onClick={() => setDisplayedQuestion(null)}>X</button>
			<p>{question?.content}</p>
		</dialog>
	);
}
