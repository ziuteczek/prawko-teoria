export default function ConfirmBtn({
	isAnswering,
	setIsAnswering,
}: {
	isAnswering: boolean;
	setIsAnswering: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<button onClick={() => setIsAnswering((isAnswering) => !isAnswering)}>
			{isAnswering ? "Odpowiedz" : "Następne pytanie"}
		</button>
	);
}
