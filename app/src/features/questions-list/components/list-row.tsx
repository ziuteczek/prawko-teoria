import type { questionRow } from "./page";

export default function QuestionListRow({
	setDisplayedQuestion,
	questionRow,
}: {
	setDisplayedQuestion: React.Dispatch<React.SetStateAction<questionRow | null>>;
	questionRow: questionRow;
}) {
	return (
		<tr
			className="bg-neutral-primary-soft border-b  border-default nth-[2n]:bg-gray-200 cursor-pointer hover:bg-stone-300 nth-[2n]:hover:bg-stone-300 transition-colors duration-50"
			onClick={() => {
				setDisplayedQuestion(questionRow);
			}}
		>
			<th scope="row" className="px-6 py-4 font-medium text-heading">
				{questionRow.id}
			</th>
			<td className="px-6 py-4 max-w-100 truncate">{questionRow.content}</td>
			<td className="px-6 py-4">{"brak"}</td>
			<td className="px-6 py-4">{questionRow.types.join(', ')}</td>
			<td className="px-6 py-4">{questionRow.correct_answer === questionRow.answer ? "Znasz" : "Nie znasz"}</td>
		</tr>
	);
}
