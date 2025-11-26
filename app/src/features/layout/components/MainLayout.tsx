import { Outlet } from "react-router";
import NavBar from "./Nav";


export default function MainLaout() {
	return (
		<div className="flex">
			<NavBar />
			<main className="ml-22">
				<Outlet />
			</main>
		</div>
	);
}
