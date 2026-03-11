import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Unable to sign in.");
                return;
            }

            localStorage.setItem("token", data.token);

            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                localStorage.setItem("user", JSON.stringify({ username }));
            }

            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-text-primary flex items-center justify-center px-5">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-tertiary p-7 shadow-xl">
                <h1 className="text-center text-3xl font-bold mb-2">
                    Login
                </h1>

                <p className="text-center text-sm text-white/65 mb-6">
                    Sign in to continue to SonarPop
                </p>

                {error && (
                    <p
                        role="alert"
                        aria-live="polite"
                        className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                    >
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-semibold text-text-primary"
                        >
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            placeholder="Enter your username"
                            required
                            className="w-full rounded-xl border border-white/15 bg-secondary px-4 py-3 text-base text-text-primary placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-text-primary"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-xl border border-white/15 bg-secondary px-4 py-3 text-base text-text-primary placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-primary py-3 font-bold text-text-primary transition hover:bg-primary-hover hover:text-text-inverse focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-tertiary disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-white/70">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded-sm"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;