import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import IndexRoute from "../routes/index.route";
import Quiz from "../features/quiz/components/Quiz";
import { AuthProvider } from "../providers/auth.provider";
import { PreloadProvider } from "../providers/preload.provider";

function App() {
    return (
        <>
            <AuthProvider>
                <PreloadProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" index element={<IndexRoute />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/quiz" element={<Quiz />} />
                        </Routes>
                    </BrowserRouter>
                </PreloadProvider>
            </AuthProvider>
        </>
    );
}

export default App;
