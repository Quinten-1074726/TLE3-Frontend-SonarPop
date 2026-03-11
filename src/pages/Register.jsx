import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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
            const response = await fetch(`${BASE_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Unable to create your account.");
                setLoading(false);
                return;
            }

            navigate("/login");
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
                    Register
                </h1>

                <p className="text-center text-sm text-white/65 mb-6">
                    Create your SonarPop account
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
                            placeholder="Choose a username"
                            required
                            className="w-full rounded-xl border border-white/15 bg-secondary px-4 py-3 text-base text-text-primary placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-text-primary"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            placeholder="Enter your email address"
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
                            autoComplete="new-password"
                            placeholder="Create a password"
                            required
                            className="w-full rounded-xl border border-white/15 bg-secondary px-4 py-3 text-base text-text-primary placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-primary py-3 font-bold text-text-primary transition hover:bg-primary-hover hover:text-text-inverse focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-tertiary disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-white/70">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-primary underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded-sm"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;