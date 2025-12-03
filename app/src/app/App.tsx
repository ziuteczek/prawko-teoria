import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import IndexRoute from "../routes/index.route";
import Quiz from "../features/quiz/components/Quiz";
import { AuthProvider } from "../providers/auth.provider";
import { PreloadProvider } from "../providers/preload.provider";
import "../styles/global.css"
import MainLaout from "../features/layout/components/MainLayout";
import Logout from "./pages/logout";

function App() {
    return (
        <>
            <AuthProvider>
                <PreloadProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<MainLaout/>}>
                                <Route path="/" index element={<IndexRoute />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/quiz" element={<Quiz />} />
                                <Route path="/logout" element={<Logout/>} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </PreloadProvider>
            </AuthProvider>
        </>
    );
}

export default App;
