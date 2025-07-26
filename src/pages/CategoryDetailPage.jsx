import { useParams } from "react-router-dom";
import { Clapperboard } from "lucide-react";

import { useEffect, useState } from "react";
import { getShowsbyGenre, getMoviesByGenre } from "../lib/api/tmdb.js";

import CardSection from "../components/common/CardSection.jsx";
import CircularProgress from "@mui/material/CircularProgress";

const movieGenreIds = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  sciencefiction: 878,
  thriller: 53,
  war: 10752,
  western: 37,
  tvmovie: 10770,
};

const tvGenreIds = {
  actionadventure: 10759,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  kids: 10762,
  mystery: 9648,
  news: 10763,
  reality: 10764,
  scififantasy: 10765,
  soap: 10766,
  talk: 10767,
  warpolitics: 10768,
  western: 37,
  action: 28,
  adventure: 12,
  horror: 27,
  romance: 10749,
};

const sanitizeName = (str) => str.replace(/[^a-zA-Z]/g, "").toLowerCase();

export default function CategoryDetailPage() {
  const { name } = useParams();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const key = sanitizeName(name);
    const movieGenreId = movieGenreIds[key];
    const tvGenreId = tvGenreIds[key];

    if (movieGenreId) {
      getMoviesByGenre(movieGenreId).then(setMovies);
    } else {
      setMovies([]);
    }

    if (tvGenreId) {
      getShowsbyGenre(tvGenreId).then(setShows);
    } else {
      setShows([]);
    }
  }, [name]);

  if (!movies.length && !shows.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  } 

  return (
    <>
      <main className="CategoryDetailPage w-full min-h-screen text-white px-6 py-10">
        <div className="flex items-center gap-4">
          <Clapperboard className="text-red-600 drop-shadow-lg" size={50} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {name} Movies
          </h1>
        </div>
        <div>
          <CardSection title={`${name} Movies`} movies_data={movies} />
        </div>
        <div className="flex items-center gap-4 mt-10">
          <Clapperboard className="text-red-600 drop-shadow-lg" size={50} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {name} TV Shows
          </h1>
        </div>
        <div>
          {shows.length > 0 ? (
            <CardSection title={`${name} Shows`} movies_data={shows} />
          ) : (
            <div className="text-center text-gray-400 mt-5">
              <p className="text-4xl">No shows available for this category.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
