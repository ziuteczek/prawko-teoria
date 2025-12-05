import type { categoriesType, ListSettingsType } from "./page";

export default function FilterQuestionsTableForm({
	categoriesList,
	listSettings,
	setListSettings,
}: {
	categoriesList: categoriesType[];
	listSettings: ListSettingsType;
	setListSettings: React.Dispatch<React.SetStateAction<ListSettingsType>>;
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
		</form>
	);
}
