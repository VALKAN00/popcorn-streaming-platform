import StarBorderIcon from "@mui/icons-material/StarBorder";
import BasicModal from "../modals/DetailModal.jsx";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../../lib/api/tmdb.js";
export default function Card({ movie, type }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [movieDetails, setMovieDetails] = useState(null);
  const handelDetails = async () => {
    try {
      // Fetch details only when opening the modal
      const details = await getMovieDetails(movie.id);
      setMovieDetails(details);
      handleOpen(); // Open modal after data is ready
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(movie.id);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movie.id]);

  return (
    <>
      <div
        key={movie.id}
        tabIndex={0}
        className="movie_card flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white p-4 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 w-[280px] sm:w-[300px] h-full min-h-[480px]"
      >
        {/* Movie Image */}
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title || movie.name || "Movie Poster"}
          className="w-full h-48 sm:h-56 object-cover rounded-lg"
        />

        {/* Title */}
        <h3 className="text-xl font-semibold mt-3 line-clamp-2">
          {movie?.title || movie?.name || "Untitled"}
        </h3>

        {/* Metadata */}
        <div className="text-gray-400 flex items-center flex-wrap gap-2 mt-1 text-sm">
          <p>{movie.release_date || movie.first_air_date || "Unknown"}</p>
          <span>|</span>
          <p>Rating: {movie.vote_average?.toFixed(1) || "N/A"}</p>
        </div>

        {/* Overview */}
        <p className="text-gray-300 text-sm mt-2 line-clamp-3 flex-1">
          {movie.overview
            ? movie.overview.length > 100
              ? `${movie.overview.slice(0, 80)}...`
              : movie.overview
            : "No description available."}
        </p>

        {/* Rating Stars */}
        <div className="flex items-center space-x-2 mt-3">
          <StarBorderIcon className="text-yellow-500" fontSize="small" />
          <span className="text-sm">{movie.vote_average?.toFixed(1)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4 w-full">
          <button
            className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto transition-all"
            onClick={() => console.log("Watch Now")}
          >
            Watch Now
          </button>

          <button
            onClick={handelDetails}
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded w-full sm:w-auto transition-all"
          >
            Details
          </button>
        </div>

        {/* Modal */}
        <BasicModal
          movie={movie}
          open={open}
          handleClose={handleClose}
          details={movieDetails}
          type={type}
        />
      </div>
    </>
  );
}
