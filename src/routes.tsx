import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./app/pages/dashboard";
import Login from "./app/pages/login";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}
export default Router;
