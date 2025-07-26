import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState, useEffect, useCallback, useRef } from "react";
import { searchMovies, searchShows } from "../../lib/api/tmdb";
import SearchBarCard from "./SearchBarCard";

import { useNavigate } from "react-router-dom";


// Styled components
const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "100px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const navigate = useNavigate();
  // State variables
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const [movieResults, showResults] = await Promise.all([
        searchMovies(query),
        searchShows(query),
      ]);
      setResults([...movieResults, ...showResults]);
      setOpenDropdown(true);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 2) {
        handleSearch();
      } else {
        setResults([]);
        setOpenDropdown(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query, handleSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <SearchContainer>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for movies or shows…"
          inputProps={{ "aria-label": "search" }}
        />
      </SearchContainer>

      {openDropdown && (
        <div className="absolute z-50 mt-2 w-full max-w-[500px] bg-black/90 text-white rounded-lg shadow-xl max-h-[60vh] overflow-y-auto">
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress color="inherit" size={24} />
            </Box>
          ) : results.length > 0 ? (
            <>
              {results.slice(0, 5).map((item) => (
                <SearchBarCard key={item.id} item={item} />
              ))}
              <div className="text-center p-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    navigate(`/search/${query}`);
                    setOpenDropdown(false);
                    setQuery("");
                  }}
                  className="text-sm text-blue-400 hover:underline"
                >
                  See All Results
                </button>
              </div>
            </>
          ) : (
            <p className="text-center py-4 text-gray-400">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}
