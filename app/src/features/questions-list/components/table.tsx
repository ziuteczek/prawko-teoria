import QuestionListRow from "./list-row";
import type { ListSettingsType, questionRow } from "./page";
import TheadQuestionsList from "./thead";

export default function QuestionsListTable({
	listSettings,
	questionsList,
	setListSettings,
	setDisplayedQuestion,
	categoriesList,
	isLoading
}: {
	listSettings: ListSettingsType;
	questionsList: questionRow[];
	setListSettings: React.Dispatch<React.SetStateAction<ListSettingsType>>;
	setDisplayedQuestion: React.Dispatch<
		React.SetStateAction<questionRow | null>
	>;
	categoriesList: string[];
	isLoading: boolean
}) {
	
	return (
		<table className="max-w-350 w-full text-sm text-left rtl:text-right text-body">
			<TheadQuestionsList
				setListSettings={setListSettings}
				listSettings={listSettings}
			/>
			<tbody>
				{questionsList.map((q) => (
					<QuestionListRow
						key={q.id}
						setDisplayedQuestion={setDisplayedQuestion}
						questionRow={q}
						categoriesTitle={categoriesList[q.categoryid]}
						isLoading={isLoading}
					/>
				))}
			</tbody>
		</table>
	);
}
