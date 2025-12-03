import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth.context";
import { Link, useNavigate } from "react-router";
import { useInView } from "react-intersection-observer";
import { PreloadContext } from "../../context/preload.context";
import supabase from "../../utils/supabase";
import { QUESTIONS_TO_PRELOAD } from "../../config/questions";
import getPendingQuestions from "../../utils/questions";
import promisifyQuestion from "../../features/quiz/utility/promisifyQuestion";
import CreaeteProfileModal from "../../features/create.profile/components/create.profile.modal";
import { PieChart } from "@mui/x-charts/PieChart";

import type { PieItemIdentifier } from "@mui/x-charts";
import type { Database } from "../../types/database.types";

function PieChartWithPaddingAngle({
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

export type userCategoryStats =
	Database["public"]["Functions"]["get_user_stats"]["Returns"];

const getUserLocalStats = (): userCategoryStats | undefined => {
	const userStatsString = localStorage.getItem("user-stats");
	if (!userStatsString) {
		return;
	}
	try {
		return JSON.parse(userStatsString);
	} catch (err) {
		console.error(err);
		return;
	}
};

export function CategoryStat({
	userStat,
}: {
	userStat: userCategoryStats[number];
}) {
	const { ref, inView } = useInView({ triggerOnce: true });
	const { user } = useContext(AuthContext);
	const { setPreloadData } = useContext(PreloadContext);

	useEffect(() => {
		if (!setPreloadData || !user || !inView) {
			return;
		}

		const preloadQuestions = async () => {
			const questionsRaw = await getPendingQuestions(
				user.id,
				userStat.categoryId,
				QUESTIONS_TO_PRELOAD
			);

			if (!questionsRaw.length) {
				return;
			}

			setPreloadData((data) => [
				...data,
				...questionsRaw
					.filter((q) => !data.map((q) => q.id).includes(q.id))
					.map((q) => promisifyQuestion(q)),
			]);
		};
		preloadQuestions();
	}, [inView, setPreloadData, user, userStat.categoryId]);

	return (
		<div
			ref={ref}
			className="border border-stone-400 p-4 rounded-md max-w-150 mb-5"
		>
			<h3 className="font-bold text-lg">{userStat.categoryTitle}</h3>
			<div className="flex justify-between">
				<div className="flex flex-col justify-around">
					<div className="mt-3">
						<p className="w-fit">
							<span className="font-medium">Pytania znane:</span>{" "}
							{userStat.correctAnswers}
						</p>
						<p className="w-fit">
							<span className="font-medium">
								Pytania nieznane:
							</span>{" "}
							{userStat.incorrectAnswers}
						</p>
						<p className="w-fit">
							<span className="font-medium">
								Pytania nieodkryte:
							</span>{" "}
							{userStat.totalQuestions -
								userStat.incorrectAnswers -
								userStat.correctAnswers}
						</p>
					</div>
					<Link
						to={`/quiz?category_id=${userStat.categoryId}`}
						state={{ categoryID: userStat.categoryId }}
						className="pt-1.5 pb-1.5 bg-green-800 rounded-sm text-white text-center font-bold hover:bg-green-900 transition-colors duration-300 mt-3"
					>
						Start
					</Link>
				</div>
				<div className="size-35 relative">
					<div className="absolute top-17.5 left-17.5 -translate-x-[50%] -translate-y-[50%]">
						<span className="font-semibold text-2xl">
							{userStat.correctAnswers}/{userStat.totalQuestions}
						</span>
					</div>
					<PieChartWithPaddingAngle
						inView={inView}
						userStats={userStat}
					/>
				</div>
			</div>
		</div>
	);
}

function CategoryStats({ usersStats }: { usersStats: userCategoryStats }) {
	return usersStats.map((userStat) => (
		<CategoryStat userStat={userStat} key={userStat.categoryId} />
	));
}

export default function Dashboard() {
	const [userStats, setUserStats] = useState<userCategoryStats>([]);
	const { user } = useContext(AuthContext);
	const redirect = useNavigate();
	const [createProfileModal, setCreateProfileModal] = useState(false);

	useEffect(() => {
		if (!user) {
			redirect("/");
			return;
		}

		const localUserStats = getUserLocalStats();
		if (localUserStats) {
			setUserStats(localUserStats);
		}

		supabase
			.rpc("get_user_stats", { p_user_id: user.id })
			.then(({ data, error }) => {
				if (error) {
					throw new Error(error.message);
				}

				setUserStats(data);
				localStorage.setItem("user-stats", JSON.stringify(data));
			});
	}, [user, redirect, createProfileModal]);

	if (!user) {
		return null;
	}

	return (
		<>
			<h1 className="text-4xl mb-3 font-bold">Dashboard</h1>
			<CreaeteProfileModal
				showModal={createProfileModal}
				setShowModal={setCreateProfileModal}
			/>
			<CategoryStats usersStats={userStats} />
		</>
	);
}
