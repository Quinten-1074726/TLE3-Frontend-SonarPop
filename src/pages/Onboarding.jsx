import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GenreCard from "../components/Cards & Carousels/GenreCard.jsx";

function Onboarding() {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${BASE_URL}/genres`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "X-API-Key": API_KEY,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                const data = await response.json();
                setGenres(data.items);
            } catch (err) {
                console.error("Failed to fetch genres:", err);
                setError("Failed to fetch genres.");
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const toggleGenre = (name) => {
        setSelectedGenres((prev) =>
            prev.includes(name)
                ? prev.filter((g) => g !== name)
                : [...prev, name]
        );
    };

    const handleContinue = async () => {
        if (selectedGenres.length < 3) {
            alert("Select at least 3 genres to continue");
            return;
        }

        setSubmitting(true);

        try {
            console.log("POST /onboarding body:", JSON.stringify({
                genres: selectedGenres,
                app: "sonarpop"
            }))
            const response = await fetch(`${BASE_URL}/onboarding`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "X-API-Key": API_KEY,
                },
                body: JSON.stringify({
                    genres: selectedGenres,
                    app: "sonarpop"
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || `Request failed: ${response.status}`);
            }

            navigate("/");
        } catch (err) {
            console.error("Onboarding failed:", err);
            alert("Onboarding failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading genres...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1 className="text-3xl text-text-primary font-bold text-center m-8">
                Getting Started
            </h1>
            <p className="text-base text-text-primary text-center m-6">
                Pick at least 3 genres ({selectedGenres.length}/3)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
                {genres.map((genre) => (
                    <GenreCard key={genre.name} genre={genre} selected={selectedGenres.includes(genre.name)} onClick={() => toggleGenre(genre.name)}/> ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={handleContinue}
                    disabled={submitting || selectedGenres.length < 3}
                    className={`rounded-full px-8 py-3 font-bold mb-8
                    ${selectedGenres.length >= 3
                        ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)]"
                        : "bg-[var(--color-disabled)] text-[var(--color-text-inverse)] cursor-not-allowed"
                    } transition`}>
                    {submitting ? "Submitting..." : "Continue"}
                </button>
            </div>
        </>
    );
}

export default Onboarding;