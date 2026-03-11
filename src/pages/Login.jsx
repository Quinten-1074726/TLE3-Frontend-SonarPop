import {useNavigate} from "react-router";
import {useState} from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.API_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                "X-API-Key": API_KEY,
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Something went wrong");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (err) {
            setError("Can't connect to server");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h2>
                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Freek"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="password">
                            Wachtwoord
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="*****"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Inloggen"}
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Nog geen account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Registreer hier
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;