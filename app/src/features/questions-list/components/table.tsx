import QuestionListRow from "./list-row";
import type { categoriesType, ListSettingsType, questionRow } from "./page";
import TheadQuestionsList from "./thead";

export default function QuestionsListTable({
	questionsList,
	categoriesList,
	setListSettings,
	setDisplayedQuestion,
}: {
	questionsList: questionRow[];
	categoriesList: categoriesType[];
	setListSettings: React.Dispatch<React.SetStateAction<ListSettingsType>>;
	setDisplayedQuestion: React.Dispatch<
		React.SetStateAction<questionRow | null>
	>;
}) {
	return (
		<table className="max-w-350 w-full text-sm text-left rtl:text-right text-body">
			<TheadQuestionsList setListSettings={setListSettings} />
			<tbody>
				{questionsList.map((q) => (
					<QuestionListRow
						setDisplayedQuestion={setDisplayedQuestion}
						questionRow={q}
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
