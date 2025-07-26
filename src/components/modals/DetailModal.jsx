import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import HdIcon from "@mui/icons-material/Hd";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { useContext, useState, useEffect } from "react";
import { FavoriteMoviesContext } from "../context/MoviesContext.jsx";
import { genreshowslist } from "../../lib/api/tmdb.js";
import { MylistContext } from "../context/MylistContext.jsx";
import Toast from "../common/Toast.jsx";

// Responsive and scrollable modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: "1000px",
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: "12px",
  boxShadow: 24,
};

export default function BasicModal({ movie, open, handleClose, details}) {
  const [messages, setMessages] = useState("");

  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const [openToast, setOpenToast] = useState(false);


  


  const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } = useContext(
    FavoriteMoviesContext
  );
  const { addToMylist, removeFromMylist, mylist } = useContext(MylistContext);

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await genreshowslist();
      setGenres(genres);
    };
    fetchGenres();
  }, []);

  const getGenreName = (genreId) => genres.find((g) => g.id === genreId)?.name;
  const genreNames =
    movie?.genre_ids?.map(getGenreName).filter(Boolean).join(", ") ||
    "Unknown Genre";
  const Movies_genre = details?.genres?.map((genre) => genre.name).join(", ");

  const handleAddToFavorites = () => {
    if (favoriteMovies.some((fav) => fav.id === movie.id)) {
      removeFavoriteMovie(movie.id);
      handleOpenToast();
      setMessages("Removed from favorites");
    } else {
      addFavoriteMovie(movie);
      handleOpenToast();
      setMessages("Added to favorites");
    }
  };

  const handleAddToMylist = () => {
    if (mylist.some((item) => item.id === movie.id)) {
      removeFromMylist(movie.id);
      handleOpenToast();
      setMessages("Removed from my list");
    } else {
      addToMylist(movie);
      handleOpenToast();
      setMessages("Added to my list");
    }
  };

  const handleOpenToast = () => setOpenToast(true);
  const handleCloseToast = () => setOpenToast(false);

  // Get login status from localStorage
  const loginStatusFromStorage = localStorage.getItem("loginStatus");
  const loginFlag = loginStatusFromStorage
    ? JSON.parse(loginStatusFromStorage)
    : false;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        style={{ backdropFilter: "blur(10px)" }}
        className="Modal-container"
      >
        <div>
          <Toast
            open={openToast}
            onClose={handleCloseToast}
            message={messages}
            severity="success"
          />
          <Box
            sx={style}
            className="bg-gradient-to-t from-black/100 to-black/90 text-white p-2"
          >
            <div className="overflow-y-auto max-h-[calc(90vh-50px)] custom-scrollbar">
              {/* Header Image & Title */}
              <div
                className="flex flex-col justify-between"
                style={{
                  width: "100%",
                  height: "45vh",
                  minHeight: "300px",
                  maxHeight: "500px",
                  padding: "20px",
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {movie.title || movie.name}
                </p>

                {/* Buttons */}
                <div className="modal-btns flex flex-wrap items-center gap-4 mt-4">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded">
                    <PlayCircleOutlineIcon className="mr-1" /> Trailer
                  </button>

                  <button
                    onClick={handleAddToMylist}
                    disabled={!loginFlag}
                    className={`${
                      loginFlag && mylist.some((item) => item.id === movie.id)
                        ? "bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
                        : "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                    } text-white p-3 rounded-full border border-white transition-opacity duration-300 ${
                      !loginFlag ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <AddIcon />
                  </button>

                  <button
                    onClick={handleAddToFavorites}
                    disabled={!loginFlag}
                    className={`${
                      loginFlag &&
                      favoriteMovies.some((fav) => fav.id === movie.id)
                        ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                        : "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                    } text-white p-3 rounded-full border border-white transition-opacity duration-300 ${
                      !loginFlag ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FavoriteBorderIcon />
                  </button>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 space-y-2 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <p className="text-lg">92% Match</p>
                  <HdIcon className="text-yellow-500" />
                </div>
                <p className="text-sm md:text-base text-gray-300">
                  {Movies_genre || genreNames} |{" "}
                  {movie.release_date || movie.first_air_date} |{" "}
                  {movie?.vote_average?.toFixed(1)} Rating
                </p>
              </div>

              {/* Description */}
              <div className="px-4 pb-4">
                <p className="text-sm md:text-base font-semibold text-gray-200">
                  {movie?.overview}
                </p>
              </div>
              <div className="flex items-center justify-center px-4 py-2">
                <hr className="border-gray-600 w-[90%]" />
              </div>
              {/* Divider and Recommendation Button */}
              <div className="flex flex-col items-end justify-center space-y-4 py-4 mr-2">
                <button className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-2 px-4 rounded">
                  Similar Recommendations
                </button>
              </div>

              {/* Rating Section */}
              <div className="px-4 pb-6">
                <p className="text-lg font-bold mb-2">Your Rating</p>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarBorderIcon
                      key={i}
                      onClick={() => setRating(i)}
                      className={`${
                        loginFlag
                          ? rating >= i
                            ? "text-yellow-500 cursor-pointer"
                            : "text-gray-500 cursor-pointer"
                          : "text-gray-500 opacity-50 cursor-not-allowed"
                      }`}
                      style={{ fontSize: "2rem" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </>
  );
}
