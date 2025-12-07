import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import QuestionsListTable from "./table";

import type { Database } from "../../../types/database.types";
import FilterQuestionsTableForm from "./filter-form";
import QuestionModalPresentation from "./question-modal";

export type questionRow = Database["public"]["Tables"]["questions"]["Row"];
export type categoriesType = Database["public"]["Tables"]["categories"]["Row"];
export type ListSettingsType = {
	ascending: boolean;
	content: string;
	questionCategoryId: number;
	licenseCategory: string;
	page: number;
	limit: number;
};

export default function QuestionsList() {
	const [questionsList, setQuestionList] = useState<questionRow[]>([]);
	const [categoriesList, setCategoriesList] = useState<categoriesType[]>([]);
	const [displayedQuestion, setDisplayedQuestion] =
		useState<questionRow | null>(null);
	const [nextPagePossible, setNextPagePossible] = useState<boolean>(false);
	const [listSettings, setListSettings] = useState<ListSettingsType>({
		ascending: true,
		content: "",
		questionCategoryId: 0,
		licenseCategory: "",
		page: 0,
		limit: 30,
	});

	useEffect(() => {
		(async () => {
			const { data, error } = await supabase
				.from("categories")
				.select("*");

			if (error) {
				return;
			}

			setCategoriesList([{ id: 0, title: "Wszystkie" }, ...data]);
		})();
	}, [categoriesList]);

	useEffect(() => {
		const setQuestionsList = async () => {
			const { data, error } = await supabase
				.from("questions")
				.select("*")
				.like("content", `%${listSettings.content}%`)
				.order("id", { ascending: listSettings.ascending })
				.or(
					!listSettings.questionCategoryId
						? "category_id.gte.0"
						: `category_id.eq.${listSettings.questionCategoryId}`
				)
				.range(
					listSettings.page * listSettings.limit,
					listSettings.page * listSettings.limit + listSettings.limit
				);

			if (error) {
				console.error("Error while fetching questions!");
				return;
			}

			setNextPagePossible(true);

			console.log("elo");

			setQuestionList(data);
		};

		setQuestionsList();
	}, [listSettings]);

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
							categoriesList={categoriesList}
							setDisplayedQuestion={setDisplayedQuestion}
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
