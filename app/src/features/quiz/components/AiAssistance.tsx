import { useContext, useEffect, useRef, useState } from "react";
import supabase from "../../../utils/supabase";
import type { QuizStage } from "../types";
import AuthContext from "../../../context/auth.context";

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
	const [requestsLeft, setRequestsLeft] = useState<number | null>(null);

	const typingIntervalRef = useRef<number | null>(null);
	const randomLoadingStageIntervalRef = useRef<number | null>(null);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) {
			return;
		}

		(async () => {
			const { data: reqLeft, error } = await supabase.rpc(
				"ai_request_count_last_month",
				{ p_profile_id: user.id }
			);

			if (error) {
				console.error(error);
				return;
			}

			setRequestsLeft(150 - reqLeft);
		})();
	}, [user]);

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

		randomLoadingStageIntervalRef.current = setInterval(() => {
			const stageIndex = Math.floor(Math.random() * loadingStages.length);
			setUserQuestion(loadingStages[stageIndex]);
		}, 1000);

		const { data, error } = await supabase.functions.invoke("open-ej-aj", {
			body: {
				questionId,
				userQuestion,
			},
		});

		clearInterval(randomLoadingStageIntervalRef.current);
		randomLoadingStageIntervalRef.current = null;

		if (error) {
			console.error(error);
			return;
		}

		const outputText = data.output as string;
		const outputTextArr = outputText.split(" ");

		setText(outputTextArr[0]);

		typingIntervalRef.current = setInterval(() => {
			setText((prev) => {
				const currTextWordArr = prev.split(" ");
				const currTextWordCount = currTextWordArr.length;

				if (outputText.length === prev.length && typingIntervalRef.current) {
					clearInterval(typingIntervalRef.current);
				}

				return [...currTextWordArr, outputTextArr[currTextWordCount]].join(" ");
			});
		}, 100);

		clearInterval(typingIntervalRef.current);
		typingIntervalRef.current = null;

		setUserQuestion("");
		setRequestsLeft((prev) => prev && prev--);
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
		<form>
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
					{text && <button onClick={() => resetHelpRequest()}>reset</button>}
					{requestsLeft && <p>Pozostało {requestsLeft} zapytań</p>}
					<p>{text}</p>
				</>
			) : (
				<></>
			)}
		</form>
	);
}
