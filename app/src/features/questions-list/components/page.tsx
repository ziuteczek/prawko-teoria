import { useContext, useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import QuestionsListTable from "./table";

import type { Database } from "../../../types/database.types";
import FilterQuestionsTableForm from "./filter-form";
import QuestionModalPresentation from "./question-modal";
import PopupContext from "../../../context/popup.context";
import AuthContext from "../../../context/auth.context";

export type categoriesType = Database["public"]["Tables"]["categories"]["Row"];
export type ListSettingsType = {
	ascending: boolean;
	content: string;
	questionCategoryId: number;
	licenseCategory: string;
	page: number;
	limit: number;
};

export type questionRow =
	Database["public"]["Functions"]["get_questions_with_answers"]["Returns"][number];

export default function QuestionsList() {
	const [questionsList, setQuestionList] = useState<questionRow[]>([]);
	const [displayedQuestion, setDisplayedQuestion] =
		useState<questionRow | null>(null);
	const [nextPagePossible, setNextPagePossible] = useState<boolean>(false);
	const [categoriesList, setCategoriesList] = useState<string[]>([]);
	const [listSettings, setListSettings] = useState<ListSettingsType>({
		ascending: true,
		content: "",
		questionCategoryId: 0,
		licenseCategory: "",
		page: 1,
		limit: 30,
	});
	const { user } = useContext(AuthContext);

	const { addPopup } = useContext(PopupContext);

	useEffect(() => {
		(async () => {
			const { data, error } = await supabase
				.from("categories")
				.select("*");

			if (error) {
				return;
			}

			const categoriesArr = data
				.toSorted((a, b) => a.id - b.id)
				.map((c) => c.title);

			setCategoriesList(["Wszystkie", ...categoriesArr]);
		})();
	}, []);

	useEffect(() => {
		if (!addPopup || !user) {
			return;
		}

		const setQuestionsList = async () => {
			const { data, error } = await supabase.rpc(
				"get_questions_with_answers",
				{
					p_profile_id: user.id,
					p_search: listSettings.content,
					p_page: listSettings.page,
					p_page_size: listSettings.limit,
					p_category_id: listSettings.questionCategoryId || undefined,
				}
			);

			if (error) {
				console.error("Error while fetching questions!");
				addPopup(
					"Błąd podczas pobierania listy pytań",
					error.message,
					"error"
				);
				return;
			}

			setNextPagePossible(true);

			setQuestionList(data);
		};

		setQuestionsList();
	}, [listSettings, addPopup, user]);

	return (
		<>
			<div className="max-h-svh">
				<h1 className="text-2xl text-center mt-4 uppercase mb-13">
					Lista aktualnych pytań egzaminacyjnych
				</h1>
				<div className="flex gap-10">
					<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default max-h-[85svh] flex-1">
						<QuestionsListTable
							listSettings={listSettings}
							questionsList={questionsList}
							setListSettings={setListSettings}
							setDisplayedQuestion={setDisplayedQuestion}
							categoriesList={categoriesList}
						/>
					</div>
					<FilterQuestionsTableForm
						setListSettings={setListSettings}
						listSettings={listSettings}
						categoriesList={categoriesList}
						nextPagePossible={nextPagePossible}
					/>
				</div>
			</div>
			<QuestionModalPresentation
				question={displayedQuestion}
				setDisplayedQuestion={setDisplayedQuestion}
			/>
		</>
	);
}
