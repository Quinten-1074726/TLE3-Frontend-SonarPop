import { useState } from "react";
import { Link, useNavigate } from "react-router";

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
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed");
                setLoading(false);
                return;
            }
            navigate("/");

        } catch (err) {
            console.error(err);
            setError("Can't connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md bg-tertiary rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-text-primary mb-6">
                    Register
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-text-primary mb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Freek"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-text-primary mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="jouwemail@voorbeeld.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-text-primary mb-1" htmlFor="password">
                            Wachtwoord
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="*****"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Bezig..." : "Registreer"}
                    </button>
                </form>

                <p className="text-sm text-text-primary mt-4 text-center">
                    Al een account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;