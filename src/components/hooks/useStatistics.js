import { useEffect, useState } from "react";
import {
  fetchStatisticsData,
  computeStatistics,
} from "../../services/statistics";

export default function useStatistics() {
  const [stats, setStats] = useState({
    artists: [],
    genres: [],
    liked: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        const { feedback, tracks, genres } = await fetchStatisticsData();

        if (!feedback || !tracks || !genres) {
          throw new Error("Failed to fetch statistics data");
        }

        const computed = computeStatistics(feedback, tracks, genres);

        if (isMounted) {
          setStats(computed);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { ...stats, loading, error };
}
