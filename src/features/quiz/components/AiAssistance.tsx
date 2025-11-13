import { useState } from "react";
import supabase from "../../../utils/supabase";
import type { QuizStage } from "../types";

export default function AiAssistance({
	questionId,
	quizStage,
}: {
	questionId?: number | null;
	quizStage: QuizStage;
}) {
	const [text, setText] = useState<string>("");
	const [userQuestion, setUserQuestion] = useState<string>("");

	const handleHelpRequest = async () => {
		const { data, error } = await supabase.functions.invoke("open-ej-aj", {
			body: {
				questionId,
				userQuestion,
			},
		});

		if (error) {
			console.error(error);
			return;
		}

		setText(data.output);
		setUserQuestion("");
	};

	return (
		<>
			{quizStage === "explanation" ? (
				<>
					<textarea
						value={userQuestion}
						onChange={(e) => setUserQuestion(e.target.value)}
					></textarea>
					<button onClick={() => handleHelpRequest()}>
						Pomoc AI
					</button>
					<p>{text}</p>
				</>
			) : (
				<></>
			)}
		</>
	);
}
