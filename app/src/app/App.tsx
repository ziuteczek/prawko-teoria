import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "../features/dashboard/components/page";
import Login from "./pages/login";
import Register from "./pages/register";
import IndexRoute from "../routes/index.route";
import Quiz from "../features/quiz/components/page";
import { AuthProvider } from "../providers/auth.provider";
import { PreloadProvider } from "../providers/preload.provider";
import "../styles/global.css";
import MainLaout from "../features/layout/components/MainLayout";
import Logout from "./pages/logout";
import QuestionsList from "../features/questions-list/components/page";
import { PopupProvider } from "../providers/popup.provider";
import PopupElsOutlet from "./pages/popups";

function App() {
	return (
		<>
			<AuthProvider>
				<PreloadProvider>
					<PopupProvider>
						<BrowserRouter>
							<Routes>
								<Route element={<PopupElsOutlet />}>
									<Route
										path="/register"
										element={<Register />}
									/>
									<Route path="/login" element={<Login />} />
									<Route
										path="/logout"
										element={<Logout />}
									/>
									<Route element={<MainLaout />}>
										<Route
											path="/"
											index
											element={<IndexRoute />}
										/>
										<Route
											path="/dashboard"
											element={<Dashboard />}
										/>
										<Route
											path="/quiz"
											element={<Quiz />}
										/>
										<Route
											path="/list"
											element={<QuestionsList />}
										/>
									</Route>
								</Route>
							</Routes>
						</BrowserRouter>
					</PopupProvider>
				</PreloadProvider>
			</AuthProvider>
		</>
	);
}

export default App;
