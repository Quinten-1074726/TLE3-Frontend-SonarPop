// THIS FILE IS FOR THE HOME PAGE - CURRENLY LOADS RECOMMENDED SONGS & ARTISTS
import { useEffect, useState } from "react";
import notFound from "../../assets/Image-not-found.png";

function useRecommendations() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [tracks, setTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchArtistImage(name, headers) {
        try {
            const res = await fetch(
                `${BASE_URL}/artists/${encodeURIComponent(name)}/image`,
                { headers }
            );

            if (!res.ok) return null;

            const data = await res.json();

            const img = data.images.find((i) => i.size === "small");
            return img?.url || null;
        } catch {
            return null;
        }
    }

    useEffect(() => {
        async function loadRecommendations() {
            try {
                const token = localStorage.getItem("token");

                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "X-API-Key": API_KEY,
                };

                // Calculate profile vector
                const profileRes = await fetch(`${BASE_URL}/profile/compute`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({}),
                });

                const { vector } = await profileRes.json();

                // Get song recommendations
                const recRes = await fetch(`${BASE_URL}/recommendations`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        profileVector: vector,
                        limit: 10,
                        dial: 3,
                    }),
                });

                const data = await recRes.json();

                const mappedTracks = data.tracks.map(({ track }) => ({
                    id: track._id,
                    title: track.title,
                    artist: track.artist,
                    imageUrl: track.imageUrl || track.albumImages?.[0]?.url,
                    similarArtists: track.similarArtists || [],
                }));

                setTracks(mappedTracks);

                // Getting artists from similarArtists
                const uniqueArtists = {};

                for (const track of mappedTracks) {
                    for (const artist of track.similarArtists) {
                        const artistName = artist.artist;

                        if (!uniqueArtists[artistName] && Object.keys(uniqueArtists).length < 10) {

                            const image = await fetchArtistImage(artistName, headers);

                            uniqueArtists[artistName] = {
                                id: artist._id || artistName,
                                name: artistName,
                                imageUrl: image || notFound,
                            };
                        }
                    }
                }

                setArtists(Object.values(uniqueArtists));

            } catch (err) {
                console.error("Recommendations failed", err);
            } finally {
                setLoading(false);
            }
        }

        loadRecommendations();
    }, []);

    return { tracks, artists, loading };
}

export default useRecommendations;