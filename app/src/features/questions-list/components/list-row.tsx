export default function QuestionListRow({
	content,
	questionCategory,
	drivingLicenseCategory,
	knowlage,
	id,
}: {
	content: string;
	questionCategory: string;
	drivingLicenseCategory: string;
	knowlage: string;
	id: number;
}) {
	return (
		<tr
			className="bg-neutral-primary-soft border-b  border-default nth-[2n]:bg-gray-100 cursor-pointer hover:bg-stone-300 nth-[2n]:hover:bg-stone-300 transition-colors duration-50"
			onClick={() => {}}
		>
			<th scope="row" className="px-6 py-4 font-medium text-heading">
				{id}
			</th>
			<td className="px-6 py-4 max-w-100 truncate">{content}</td>
			<td className="px-6 py-4">{questionCategory}</td>
			<td className="px-6 py-4">{drivingLicenseCategory}</td>
			<td className="px-6 py-4">{knowlage}</td>
		</tr>
	);
}
