import { useContext, useEffect } from "react";
import { QUESTIONS_TO_PRELOAD } from "../../../config/questions";
import getPendingQuestions from "../../../utils/questions";
import { useInView } from "react-intersection-observer";
import AuthContext from "../../../context/auth.context";
import { PreloadContext } from "../../../context/preload.context";
import type { userCategoryStats } from "./page";
import promisifyQuestion from "../../quiz/utility/promisifyQuestion";
import { Link } from "react-router";
import UserStatsPieChart from "./pie-chart";

export default function CategoryStat({
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
			className="border border-stone-400 p-4 rounded-md max-w-150"
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
					<UserStatsPieChart inView={inView} userStats={userStat} />
				</div>
			</div>
		</div>
	);
}
