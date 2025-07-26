import "../App.css";

import LiveTvIcon from "@mui/icons-material/LiveTv";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import CircularProgress from "@mui/material/CircularProgress";

import CardSection from "../components/common/CardSection.jsx";
import { useState } from "react";
import ImageSlider from "../components/common/ImageSlider.jsx";



//api
import {
  getPopularMovies,
  getPopularShows,
  genreshowslist,
} from "../lib/api/tmdb.js";
import { useEffect } from "react";

export default function Homepage() {
  // State to hold movies and shows data
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  // Error and loading states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //handle slider content change
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderContent, setSliderContent] = useState(movies[0]);

  // Set initial slider content based on movies , This will be updated when movies are fetched
  useEffect(() => {
    if (Array.isArray(movies) && movies.length > 0) {
      setSliderContent(movies[9]);
      setCurrentIndex(9);
    }
  }, [movies]);

  // Fetch genres for the slider content
  // This will be used to display genre names in the slider
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresList = await genreshowslist();
        setGenres(genresList);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  // Map genre IDs to names for the slider content
  const genreNames = sliderContent?.genre_ids
    ? sliderContent.genre_ids.map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : "Unknown Genre";
      })
    : [];

  // Fetch popular movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to fetch movies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Fetch popular shows

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const popularShows = await getPopularShows();
        setShows(popularShows);
      } catch (err) {
        setError("Failed to fetch shows", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  const handleSliderChange = (direction) => {
    if (!movies || movies.length === 0) return;

    let newIndex = currentIndex;

    if (direction === "left") {
      newIndex = (currentIndex - 1 + movies.length) % movies.length;
    } else if (direction === "right") {
      newIndex = (currentIndex + 1) % movies.length;
    }

    setCurrentIndex(newIndex);
    setSliderContent(movies[newIndex]);
  };

  // Prevent rendering before data is ready
  if (!sliderContent || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }
  
  return (
    <div className="homepage w-full min-h-screen text-white">
      {/* Hero Banner */}
      <ImageSlider
        sliderContent={sliderContent}
        genreNames={genreNames}
        handleSliderChange={handleSliderChange}
      />

      {/* Sections */}
      <div className="Content_container px-4 sm:px-8 mt-10">
        <div className="Trend-movies mb-12">
          <CardSection
            icon={
              <TrendingUpIcon
                style={{ fontSize: "4rem" }}
                className="text-red-800"
              />
            }
            title="Trending Movies"
            movies_data={movies.slice(0, 20)}
          />
        </div>

        <div className="Trend-shows mb-12">
          <CardSection
            icon={
              <LiveTvIcon
                style={{ fontSize: "4rem" }}
                className="text-blue-900"
              />
            }
            title="Trending Shows"
            movies_data={shows.slice(0, 20)}
            type="shows"
          />
        </div>
      </div>
    </div>
  );
}
