import CardSection from "../components/common/CardSection.jsx";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import CircularProgress from "@mui/material/CircularProgress";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useState } from "react";

import { getPopularMovies, genreshowslist,getMoviesByGenre } from "../lib/api/tmdb.js";
import { useEffect } from "react";

import ImageSlider from "../components/common/ImageSlider.jsx";

export default function MoviesPage() {
 const [movies, setMovies] = useState([]);
const [actionMovies, setActionMovies] = useState([]);
const [dramaMovies, setDramaMovies] = useState([]);
const [genres, setGenres] = useState([]);

const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

const [currentIndex, setCurrentIndex] = useState(0);
const [sliderContent, setSliderContent] = useState(null);

// Fetch popular movies
useEffect(() => {
  const fetchPopularMovies = async () => {
    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      console.error("Failed to fetch movies", err);
      setError("Failed to fetch popular movies");
    }
  };

  fetchPopularMovies();
}, []);

// Fetch action movies
useEffect(() => {
  const fetchActionMovies = async () => {
    try {
      const data = await getMoviesByGenre(28);
      setActionMovies(data);
    } catch (err) {
      console.error("Failed to fetch action movies", err);
      setError("Failed to fetch action movies");
    }
  };

  fetchActionMovies();
}, []);

// Fetch drama movies
useEffect(() => {
  const fetchDramaMovies = async () => {
    try {
      const data = await getMoviesByGenre(18);
      setDramaMovies(data);
    } catch (err) {
      console.error("Failed to fetch drama movies", err);
      setError("Failed to fetch drama movies");
    }
  };

  fetchDramaMovies();
}, []);

// Fetch genres
useEffect(() => {
  const fetchGenres = async () => {
    try {
      const data = await genreshowslist();
      setGenres(data);
    } catch (err) {
      console.error("Failed to fetch genres", err);
    }
  };

  fetchGenres();
}, []);

// Update slider content once movies are fetched
useEffect(() => {
  if (movies.length > 0) {
    const index = movies[13] ? 13 : 0; // Fallback to 0 if not enough items
    setSliderContent(movies[index]);
    setCurrentIndex(index);
    setLoading(false);
  }
}, [movies]);

// Map genre IDs to names for the current slider content
const genreNames = sliderContent?.genre_ids?.map((id) => {
  const genre = genres.find((g) => g.id === id);
  return genre ? genre.name : "Unknown Genre";
}) || [];

// Slider change logic
const handleSliderChange = (direction) => {
  if (movies.length === 0) return;

  const total = movies.length;
  const newIndex =
    direction === "left"
      ? (currentIndex - 1 + total) % total
      : (currentIndex + 1) % total;

  setCurrentIndex(newIndex);
  setSliderContent(movies[newIndex]);
};

// Prevent rendering before data is ready
if (loading || !sliderContent) {
  return (
    <div className="flex justify-center items-center h-[60vh]">
        <CircularProgress color="inherit" />
      </div>
  );
}


  
  return (
    <div>
      {/* Hero Banner */}
      <ImageSlider
        handleSliderChange={handleSliderChange}
        sliderContent={sliderContent}
        genreNames={genreNames}
      />
      <p className="text-8xl font-black tracking-wider bg-clip-text bg-white mt-4 ml-5">
        Movies
      </p>
      <CardSection
        icon={
          <TrendingUpIcon
            className="text-red-800"
            style={{ fontSize: "3rem" }}
          />
        }
        title="Trending Now"
        movies_data={movies.slice(0, 16)}
      />
      <CardSection
        icon={
          <SportsKabaddiIcon
            className="text-red-800"
            style={{ fontSize: "3rem" }}
          />
        }
        title="Action Packed"
        movies_data={actionMovies}
      />
      <CardSection
        icon={
          <LiveTvIcon className="text-red-800" style={{ fontSize: "3rem" }} />
        }
        title="Top Dramas"
        movies_data={dramaMovies.slice(0, 12)}
      />
    </div>
  );
}
