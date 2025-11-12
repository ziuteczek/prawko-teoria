import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth.context";
import { Link, useNavigate } from "react-router";
import { useInView } from "react-intersection-observer";
import { PreloadContext } from "../../context/preload.context";
import supabase from "../../utils/supabase";
import { QUESTIONS_TO_PRELOAD } from "../../config/questions";
import type { Database } from "../../types/database.types";
import getPendingQuestions from "../../utils/questions";
import promisifyQuestion from "../../features/quiz/utility/promisifyQuestion";
import CreaeteProfileModal from "../../features/create.profile/components/create.profile.modal";
import redirectToCheckout from "../../features/payments/api/redirectToCheckout";

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
		<div ref={ref}>
			<h3>{userStat.categoryTitle}</h3>
			<p>Pytania znane: {userStat.correctAnswers}</p>
			<p>Pytania nieznane: {userStat.incorrectAnswers}</p>
			<p>
				Pytania nieodkryte:{" "}
				{userStat.totalQuestions -
					userStat.incorrectAnswers -
					userStat.correctAnswers}
			</p>
			<Link
				to={`/quiz?category_id=${userStat.categoryId}`}
				state={{ categoryID: userStat.categoryId }}
			>
				Start
			</Link>
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
			<CreaeteProfileModal
				showModal={createProfileModal}
				setShowModal={setCreateProfileModal}
			/>
			<CategoryStats usersStats={userStats} />
			<button onClick={() => supabase.auth.signOut()}>Wyloguj</button>
			<button
				onClick={() =>
					redirectToCheckout(
						"price_1SRe2qEypKlccoWcicZmIdUu",
						user.id,
						"dymnystanek@gmail.com"
					)
				}
			>
				kup
			</button>
		</>
	);
}
