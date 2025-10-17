import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Link, useNavigate } from "react-router";
import { getUserCategoryStats } from "../../queries/user.stats";
import { useInView } from "react-intersection-observer";
import { PreloadContext } from "../../context/preload";
import supabase from "../../utils/supabase";
import { QUESTIONS_TO_PRELOAD } from "../../config/questions";
import QuestionsQueue from "../../utils/questionQueue";

export async function getPendingQuestions(
	userId: string,
	categoryID: number,
	limit: number = 5
) {
	const { data, error } = await supabase.rpc(
		"get_user_unanswered_or_incorrect_questions",
		{
			user_uuid: userId,
			max_questions: limit,
			category_id: categoryID,
		}
	);

	if (error) {
		console.error("Error fetching pending questions:", error);
		return [];
	}

	return data;
}

export type questionsRaw = Awaited<
	ReturnType<typeof getPendingQuestions>
>[number];

type userCategoryStats = Awaited<ReturnType<typeof getUserCategoryStats>>;

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

function CategoryStat({ userStat }: { userStat: userCategoryStats[number] }) {
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
				userStat.category_id,
				QUESTIONS_TO_PRELOAD
			);

			if (!questionsRaw.length) {
				return;
			}

			setPreloadData((data) => [
				...data,
				...questionsRaw.map((q) => QuestionsQueue.promisifyQuestion(q)),
			]);
		};
		preloadQuestions();

		console.log(userStat.category_title);
	}, [inView]);

	return (
		<div ref={ref}>
			<h3>{userStat.category_title}</h3>
			<p>Pytania znane: {userStat.known_questions}</p>
			<p>Pytania nieznane: {userStat.unknown_questions}</p>
			<p>Pytania nieodkryte: {userStat.undiscovered_questions}</p>
			<Link
				to={`/quiz?category_id=${userStat.category_id}`}
				state={{ categoryID: userStat.category_id }}
			>
				Start
			</Link>
		</div>
	);
}

function CategoryStats({ usersStats }: { usersStats: userCategoryStats }) {
	return usersStats.map((userStat) => (
		<CategoryStat userStat={userStat} key={userStat.category_id} />
	));
}

export default function Dashboard() {
	const [userStats, setUserStats] = useState<userCategoryStats>([]);
	const { user } = useContext(AuthContext);
	const redirect = useNavigate();

	useEffect(() => {
		if (!user) {
			return;
		}

		const localUserStats = getUserLocalStats();
		if (localUserStats) {
			setUserStats(localUserStats);
		}

		getUserCategoryStats(user.id).then((data) => {
			setUserStats(data);
			localStorage.setItem("user-stats", JSON.stringify(data));
		});
	}, [user]);

	if (!user) {
		redirect("/register");
		return null;
	}

	return <CategoryStats usersStats={userStats} />;
}
