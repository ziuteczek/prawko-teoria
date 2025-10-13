import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Link, useNavigate } from "react-router";
import { getUserCategoryStats } from "../../queries/user.stats";

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

export default function Dashboard() {
	const [userStats, setUserStats] = useState<userCategoryStats>([]);
	const { user } = useContext(AuthContext);
	const redirect = useNavigate();

	useEffect(() => {
		if (!user) {
			redirect("/register");
			return;
		}

		const localUserStats = getUserLocalStats();
		if (localUserStats) {
			setUserStats(localUserStats);
		}

		getUserCategoryStats(user.id).then((data) => setUserStats(data));
	}, [user, redirect]);

	if (!user) {
		return null;
	}

	return userStats.map((userStat) => (
		<div key={userStat.category_title}>
			<h3>{userStat.category_title}</h3>
			<p>Pytania znane: {userStat.known_questions}</p>
			<p>Pytania nieznane: {userStat.unknown_questions}</p>
			<p>Pytania nieodkryte: {userStat.undiscovered_questions}</p>
            <Link to="#">Start</Link>
		</div>
	));
}
