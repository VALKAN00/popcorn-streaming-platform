import { useParams } from "react-router-dom";
import { searchMovies, searchShows } from "../lib/api/tmdb.js";
import CardSection from "../components/common/CardSection.jsx";
import { Clapperboard } from "lucide-react";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
export default function SearchPage() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const [movieResults, showResults] = await Promise.all([
          searchMovies(query),
          searchShows(query),
        ]);
        setMovies(movieResults);
        setShows(showResults);
        setName(query);
        setLoading(false);
      } catch (error) {
        console.error("Search failed:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <CircularProgress color="inherit" />
      </div>
    );
  }
  return (
    <>
      <main className="w-full min-h-screen text-white px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        {/* Movies Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clapperboard className="text-red-600 drop-shadow-lg" size={36} />
              {/* Changed h1 to h2 */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight">
                Movies
              </h2>
            </div>
          </div>
          <div >
            <CardSection title={`${name} Movies`} movies_data={movies} />
          </div>
        </section>

        {/* Shows Section */}
        <section className="mt-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clapperboard className="text-red-600 drop-shadow-lg" size={36} />
              {/* Changed h1 to h2 */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight">
                TV Shows
              </h2>
            </div>
          </div>
          <div>
            {shows.length > 0 ? (
              <CardSection title={`${name} Shows`} movies_data={shows} />
            ) : (
              <div className="text-center text-gray-400 mt-5">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  No shows available for this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
