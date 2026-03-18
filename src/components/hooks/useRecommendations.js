// THIS FILE IS FOR THE HOME PAGE - CURRENTLY LOADS RECOMMENDED SONGS & ARTISTS
import { useEffect, useState, useRef } from "react";
import notFound from "../../assets/Image-not-found.png";

function useRecommendations(sliderValue) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const retryCount = useRef(0);

  useEffect(() => {
    let isMounted = true;

    async function loadRecommendations() {
      setLoading(true);
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

        if (!profileRes.ok) {
          throw new Error(`Profile compute failed: ${profileRes.status}`);
        }

        const { vector } = await profileRes.json();

        if (!vector) {
          throw new Error("Profile vector is empty");
        }

        // Get song recommendations and use sliderValue to change the dial
        const recRes = await fetch(`${BASE_URL}/recommendations`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            profileVector: vector,
            limit: 10,
            dial: Math.min(5, Math.max(1, sliderValue)),
          }),
        });

        if (!recRes.ok) {
          throw new Error(`Recommendations failed: ${recRes.status}`);
        }

        const data = await recRes.json();

        const mappedTracks = data.tracks.map(({ track }) => ({
          id: track._id,
          title: track.title,
          artist: track.artist,
          imageUrl: track.imageUrl || track.albumImages?.[0]?.url,
          albumImages: track.albumImages || [],
          similarArtists: track.similarArtists || [],
          previewUrl: track.previewUrl,
        }));

        if (isMounted) {
          setTracks(mappedTracks);

          // Getting artists from similarArtists
          const uniqueArtists = {};
          mappedTracks.forEach((track) => {
            track.similarArtists.forEach((artist) => {
              const artistName = artist.artist;
              const artistImage = track.albumImages?.[0]?.url || notFound;

              if (
                !uniqueArtists[artistName] &&
                Object.keys(uniqueArtists).length < 10
              ) {
                uniqueArtists[artistName] = {
                  id: artist._id || artistName,
                  name: artistName,
                  imageUrl: artistImage,
                };
              }
            });
          });

          setArtists(Object.values(uniqueArtists));
          retryCount.current = 0;
        }
      } catch (err) {
        console.error("Recommendations failed", err);
        // Retry once after 1 second if first attempt fails
        if (isMounted && retryCount.current < 1) {
          retryCount.current += 1;
          setTimeout(() => {
            if (isMounted) loadRecommendations();
          }, 1000);
          return;
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const handler = setTimeout(() => {
      loadRecommendations();
    }, 400);

    return () => {
      isMounted = false;
      clearTimeout(handler);
    };
  }, [API_KEY, BASE_URL, sliderValue]);

  return { tracks, artists, loading };
}

export default useRecommendations;
