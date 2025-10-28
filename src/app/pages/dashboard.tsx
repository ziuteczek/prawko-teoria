import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Link, useNavigate } from "react-router";
import { useInView } from "react-intersection-observer";
import { PreloadContext } from "../../context/preload";
import supabase from "../../utils/supabase";
import { QUESTIONS_TO_PRELOAD } from "../../config/questions";
import type { Database } from "../../types/database.types";
import { getPendingQuestions } from "../../utils/questions";
import promisifyQuestion from "../../features/quiz/utility/promisifyQuestion";

type userCategoryStats =
	Database["public"]["Functions"]["get_profile_question_stats"]["Returns"];

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
				...questionsRaw.map((q) => promisifyQuestion(q)),
			]);
		};
		preloadQuestions();
	}, [inView, setPreloadData, user, userStat.category_id]);

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
			redirect("/");
			return;
		}

		const localUserStats = getUserLocalStats();
		if (localUserStats) {
			setUserStats(localUserStats);
		}

		supabase
			.rpc("get_profile_question_stats", { p_profile_id: user.id })
			.then(({ data, error }) => {
				if (error) {
					throw new Error(error.message);
				}

				setUserStats(data);
				localStorage.setItem("user-stats", JSON.stringify(data));
			});
	}, [user, redirect]);

	if (!user) {
		return null;
	}

	return (
		<>
			<CategoryStats usersStats={userStats} />
			<button onClick={() => supabase.auth.signOut()}>Wyloguj</button>
		</>
	);
}
