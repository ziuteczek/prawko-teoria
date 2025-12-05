import QuestionListRow from "./list-row";
import type { categoriesType, ListSettingsType, questionRow } from "./page";
import TheadQuestionsList from "./thead";

export default function QuestionsListTable({
	questionsList,
    categoriesList,
	setListSettings,
}: {
	questionsList: questionRow[];
	categoriesList: categoriesType[];
	setListSettings: React.Dispatch<React.SetStateAction<ListSettingsType>>;
}) {
	return (
		<table className="max-w-350 w-full text-sm text-left rtl:text-right text-body">
			<TheadQuestionsList setListSettings={setListSettings} />
			<tbody>
				{questionsList.map((q) => (
					<QuestionListRow
						content={q.content}
						questionCategory={
							categoriesList.find((c) => c.id === q.category_id)
								?.title || `${q.category_id}`
						}
						drivingLicenseCategory={"B"}
						knowlage={"bad"}
						id={q.id}
					/>
				))}
			</tbody>
		</table>
	);
}
