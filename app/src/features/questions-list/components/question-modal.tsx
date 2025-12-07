import { useEffect, useRef } from "react";
import type { questionRow } from "./page";
import { GOOGLE_CLOUD_URI } from "../../../config/cloud.storage";

function MediaPlayer({ mediaSrc }: { mediaSrc: string | null | undefined }) {
	if (mediaSrc?.endsWith(".webm")) {
		return <video src={GOOGLE_CLOUD_URI + mediaSrc} />;
	} else if (mediaSrc?.endsWith(".webp")) {
		return <img src={GOOGLE_CLOUD_URI + mediaSrc} alt="" />;
	} else {
		return <img></img>;
	}
}

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
		<dialog ref={dialogRef} onClose={() => setDisplayedQuestion(null)}>
			<button onClick={() => setDisplayedQuestion(null)}>X</button>
			<p>{question?.content}</p>
			<MediaPlayer mediaSrc={question?.media} />
		</dialog>
	);
}
