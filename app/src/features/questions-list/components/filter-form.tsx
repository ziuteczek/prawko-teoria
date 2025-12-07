import type { categoriesType, ListSettingsType } from "./page";

export default function FilterQuestionsTableForm({
	categoriesList,
	listSettings,
	setListSettings,
	nextPagePossible,
}: {
	categoriesList: categoriesType[];
	listSettings: ListSettingsType;
	setListSettings: React.Dispatch<React.SetStateAction<ListSettingsType>>;
	nextPagePossible: boolean;
}) {
	return (
		<form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
			<h2 className="text-3xl uppercase text-center">Filtry</h2>
			<label className="text-sm" htmlFor="content-input">
				Treść
			</label>
			<input
				type="text"
				className="border"
				id="content-input"
				placeholder="Treść pytania"
				value={listSettings.content}
				autoComplete="off"
				onChange={(e) =>
					setListSettings((prev) => ({
						...prev,
						content: e.target.value,
					}))
				}
			/>

			<label className="text-sm" htmlFor="question-cateogry">
				Kateogria pytania
			</label>
			<select
				onChange={(e) =>
					setListSettings((prev) => ({
						...prev,
						questionCategoryId: Number(e.target.value),
					}))
				}
				id="question-category"
				className="max-w-50  truncate"
			>
				{categoriesList.map((category) => (
					<option key={category.id} value={category.id}>
						{category.title}
					</option>
				))}
			</select>

			<label htmlFor="questions-per-site">Liczba pytań na stronę</label>
			<select
				id="questions-per-site"
				onChange={(e) =>
					setListSettings((prev) => ({
						...prev,
						limit: Number(e.target.value),
					}))
				}
				value={listSettings.limit}
			>
				<option value="30">30</option>
				<option value="40">40</option>
				<option value="50">50</option>
			</select>

			<div className="flex justify-around">
				<button
					className="bg-blue-300 py-1.5 px-3 border border-gray-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
					disabled={listSettings.page === 0}
					onClick={() =>
						setListSettings((prev) => ({
							...prev,
							page: prev.page - 1,
						}))
					}
				>
					Poprzednia
				</button>
				<div>{listSettings.page + 1}</div>
				<button
					className="bg-blue-300 py-1.5 px-3 border border-gray-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
					onClick={() =>
						setListSettings((prev) => ({
							...prev,
							page: prev.page + 1,
						}))
					}
					disabled={!nextPagePossible}
				>
					Następna
				</button>
			</div>
		</form>
	);
}
