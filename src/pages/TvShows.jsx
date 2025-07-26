import CardSection from "../components/common/CardSection.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useState, useEffect } from "react";

import {
  getTopRatedshows,
  genreshowslist,
  topShowsOfTheYear,
} from "../lib/api/tmdb.js";
import ImageSlider from "../components/common/ImageSlider.jsx";

export default function TvShows() {
  const [shows_data, setShowsData] = useState([]);
  const [topShowsOfTheYearData, setTopShowsOfTheYearData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //handle slider content change
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderContent, setSliderContent] = useState(shows_data[0]);

  // Set initial slider content based on movies , This will be updated when movies are fetched
  useEffect(() => {
    if (Array.isArray(shows_data) && shows_data.length > 0) {
      setSliderContent(shows_data[0]);
      setCurrentIndex(0);
    }
  }, [shows_data]);

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

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const topShows = await topShowsOfTheYear();
        setTopShowsOfTheYearData(topShows);
      } catch (err) {
        console.error("Failed to fetch top shows of the year", err);
      }
    };
    fetchShows();
  }, []);

  // Map genre IDs to names for the slider content
  const genreNames = sliderContent?.genre_ids
    ? sliderContent.genre_ids.map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : "Unknown Genre";
      })
    : [];

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const popularShows = await getTopRatedshows();
        setShowsData(popularShows);
      } catch (err) {
        setError("Failed to fetch shows", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  const handleSliderChange = (direction) => {
    if (!shows_data || shows_data.length === 0) return;

    let newIndex = currentIndex;

    if (direction === "left") {
      newIndex = (currentIndex - 1 + shows_data.length) % shows_data.length;
    } else if (direction === "right") {
      newIndex = (currentIndex + 1) % shows_data.length;
    }

    setCurrentIndex(newIndex);
    setSliderContent(shows_data[newIndex]);
  };

  // Prevent rendering before data is ready
  if (!sliderContent || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  console.log("Slider Content:", sliderContent);

  return (
    <div className="tvshows flex flex-col">
      {/* Image Slider */}
      <ImageSlider
        sliderContent={sliderContent}
        genreNames={genreNames}
        handleSliderChange={handleSliderChange}
      />
      <p className="text-7xl font-black tracking-wider bg-clip-text bg-white mt-4 ml-5">
        TV SHOWS
      </p>
      <CardSection
        icon={
          <LiveTvIcon className="text-blue-900" style={{ fontSize: "3rem" }} />
        }
        title="Top Dramas"
        movies_data={shows_data.slice(0, 20)}
      />
      <CardSection
        icon={
          <LiveTvIcon className="text-blue-900" style={{ fontSize: "3rem" }} />
        }
        title="Top Of The Year"
        movies_data={topShowsOfTheYearData}
      />
    </div>
  );
}
