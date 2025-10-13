import React, { useState } from "react";
import supabase from "../../utils/supabase";

import type { loginData } from "../../types/login.types";
import { Link } from "react-router";

export default function Login() {
    const [loginData, setLoginData] = useState<loginData>({
        email: "",
        password: "",
        keepLogin: false,
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = loginData;
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={(e) => handleLogin(e)}>
            <label htmlFor="email">email</label>
            <input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                }
            />
            <label htmlFor="password">hasło</label>
            <input
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                }
            />
            <label htmlFor="keepLogin">nie wylogowuj</label>
            <input
                id="keepLogin"
                type="checkbox"
                checked={loginData.keepLogin}
                onChange={(e) =>
                    setLoginData({ ...loginData, keepLogin: e.target.checked })
                }
            />
            <button type="submit">zaloguj się</button>
            <Link to="/register">zarejestruj się</Link>
        </form>
    );
}
