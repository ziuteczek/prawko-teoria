import { PieChart, type PieItemIdentifier } from "@mui/x-charts";
import type { userCategoryStats } from "./page";
import { useNavigate } from "react-router";

export default function UserStatsPieChart({
	inView,
	userStats,
}: {
	inView: boolean;
	userStats: userCategoryStats[number];
}) {
	const redirect = useNavigate();

	const handleItemClick = (
		_: React.MouseEvent<SVGPathElement, MouseEvent>,
		itemData: PieItemIdentifier
	) => {
		switch (itemData.dataIndex) {
			case 0:
				redirect(`/quiz?category_id=${userStats.categoryId}`, {
					state: { categoryID: userStats.categoryId },
				});
				break;
			case 1:
				redirect(`/quiz?category_id=${userStats.categoryId}`, {
					state: { categoryID: userStats.categoryId },
				});
				break;
			case 2:
				redirect(`/quiz?category_id=${userStats.categoryId}`, {
					state: { categoryID: userStats.categoryId },
				});
				break;
		}
	};

	const data = inView
		? [
				{
					id: 1,
					label: "Pytania znane",
					value: userStats.correctAnswers,
					color: "green",
				},
				{
					id: 2,
					label: "Pytania nieznane",
					value: userStats.incorrectAnswers,
					color: "red",
				},
				{
					id: 3,
					label: "Pytania nieodkryte",
					value:
						userStats.totalQuestions -
						userStats.incorrectAnswers -
						userStats.correctAnswers,
					color: "#AAA",
				},
		  ]
		: [];

	return (
		<PieChart
			series={[
				{
					paddingAngle:
						userStats.correctAnswers + userStats.incorrectAnswers
							? 3
							: 0,
					innerRadius: "75%",
					outerRadius: "100%",
					data,
					highlightScope: { fade: "series", highlight: "item" },
					highlighted: { additionalRadius: 5 },
					faded: {
						innerRadius: 20,
						additionalRadius: -10,
						color: "gray",
					},
				},
			]}
			hideLegend
			onItemClick={handleItemClick}
		/>
	);
}
