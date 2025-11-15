import { useEffect, useState } from "react";
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
	const [loading, setIsLoading] = useState<boolean>(false);

	const handleHelpRequest = async () => {
		setIsLoading(true);

		const loadingStages = [
			"kminienie",
			"główkowanie",
			"myślenie intensywne",
			"przekręcanie w głowie",
			"kombinowanie jak szalony",
			"planowanie misternych planów",
			"próbowanie wszystkiego",
			"szukanie rozwiązania w ciemno",
			"obracanie pomysłów w głowie",
			"przekombinowywanie",
			"myślowy akrobatyzm",
			"kombinatornia myślowa",
			"główkowanie na pełnych obrotach",
		];

		const randomLoadingStageInterval = setInterval(() => {
			const stageIndex = Math.floor(Math.random() * loadingStages.length);
			setUserQuestion(loadingStages[stageIndex]);
		}, 1000);

		const { data, error } = await supabase.functions.invoke("open-ej-aj", {
			body: {
				questionId,
				userQuestion,
			},
		});

		clearInterval(randomLoadingStageInterval);

		if (error) {
			console.error(error);
			return;
		}

		const outputText = data.output as string;
		const outputTextArr = outputText.split(" ");

		setText(outputTextArr[0]);

		const typingInterval = setInterval(() => {
			setText((prev) => {
				const currTextWordArr = prev.split(" ");
				const currTextWordCount = currTextWordArr.length;

				if (outputText.length === prev.length) {
					clearInterval(typingInterval);
				}

				return [
					...currTextWordArr,
					outputTextArr[currTextWordCount],
				].join(" ");
			});
		}, 100);

		setUserQuestion("");

		setIsLoading(false);
	};

	useEffect(() => {
		if (quizStage === "reading") {
			setText("");
			setUserQuestion("");
		}
	}, [quizStage]);

	const resetHelpRequest = () => {
		setText("");
		setUserQuestion("");
	};

	return (
		<>
			{quizStage === "explanation" ? (
				<>
					<textarea
						value={userQuestion}
						onChange={(e) => setUserQuestion(e.target.value)}
						disabled={!!text || loading}
					></textarea>
					<button
						onClick={() => handleHelpRequest()}
						disabled={!!text || loading}
					>
						Pomoc AI
					</button>
					{text && (
						<button onClick={() => resetHelpRequest()}>
							reset
						</button>
					)}
					<p>{text}</p>
				</>
			) : (
				<></>
			)}
		</>
	);
}
