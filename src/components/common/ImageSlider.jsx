import { ArrowLeft, ArrowRight } from "lucide-react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Button from "@mui/material/Button";
import BasicModal from '../modals/DetailModal.jsx';
import { useState} from "react";
export default function ImageSlider({ sliderContent, genreNames, handleSliderChange }) {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  return (
    <div
      className="relative w-full h-[75vh] bg-cover bg-center flex items-center justify-between px-4 sm:px-8"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${sliderContent?.backdrop_path})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90 z-0"></div>

      {/* Left Arrow */}
      <button
        onClick={() => handleSliderChange("left")}
        className="z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-black/30 hover:bg-white/10 flex items-center justify-center transition"
      >
        <ArrowLeft style={{ width: "28px", height: "28px", color: "white" }} />
      </button>

      {/* Content */}
      <div className="z-10 flex flex-col sm:flex-row items-start justify-between w-full mx-4 sm:mx-10 gap-6 sm:gap-10">
        <div className="slider-content flex-1 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
            {sliderContent?.title || sliderContent?.name || "Untitled"}
          </h1>

          <div className="flex flex-wrap items-center text-gray-300 gap-2 text-sm sm:text-base mb-4">
            <p>{sliderContent?.release_date || sliderContent?.first_air_date ||"Unknown Date"}</p>
            <span className="text-xl hidden sm:inline">•</span>
            <p>{genreNames?.join(", ")}</p>
            <span className="text-xl hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <StarBorderIcon className="text-yellow-400" />
              <p>{sliderContent?.vote_average?.toFixed(1)}</p>
            </div>
          </div>

          <p className="text-white text-sm sm:text-base mb-6 line-clamp-3 sm:line-clamp-none">
            {sliderContent?.overview?.slice(0, 120) ||
              "No description available..."}
            ...
          </p>

          <div className="flex gap-4">
            <Button
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 py-2 rounded shadow-md text-sm sm:text-base"
              variant="contained"
            >
              <PlayCircleOutlineIcon className="mr-2" /> Play Trailer
            </Button>
            <Button
              className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-6 py-2 rounded shadow-md text-sm sm:text-base"
              variant="contained"
              onClick={handleModalOpen}
            >
              More Details
            </Button>
          </div>
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => handleSliderChange("right")}
        className="z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white bg-black/30 hover:bg-white/10 flex items-center justify-center transition"
      >
        <ArrowRight style={{ width: "28px", height: "28px", color: "white" }} />
      </button>

      <BasicModal open={open} setOpen={setOpen} handleClose={handleModalClose} movie={sliderContent} />
      
    </div>
  );
}
