const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";    
import axios from "axios";

export const getPopularMovies = async () => {
  try {
    // Fetch page 1 (20 movies)
    const response1 = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: 1,
      },
    });

    const page1 = response1.data.results;

    // Fetch page 2 (to get at least one more movie)
    const response2 = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: 2,
      },
    });

    const page2 = response2.data.results;

    // Combine and return first 21 movies
    return [...page1, ...page2];
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export const genreshowslist = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const genreslist = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/tv/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};
export const getShowsbyGenre = async (genreId) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching shows by genre:", error?.response?.data || error.message);
    return [];
  }
};

export const getPopularShows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        page: 1, // each page returns 20 results
      },
    });

    const page1 = response.data.results;

    // Fetch second page to get one more
    const response2 = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        page: 2,
      },
    });

    const page2 = response2.data.results;

    // Combine and slice 21 items
    return [...page1, ...page2];
  } catch (error) {
    console.error("Error fetching popular shows:", error);
    return [];
  }
};

export const getShowDetails = async (showId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${showId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching show details:", error);
    return null;
  }
};

export const getTopRatedshows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated shows:", error);
    return [];
  }
};


export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        sort_by: "vote_average.desc",

      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const searchShows = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/tv`, {
      params: {
        api_key: API_KEY,
        query,
        sort_by: "vote_average.desc",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching shows:", error);
    return [];
  }
};  

export const topShowsOfTheYear = async () => {
  const year = new Date().getFullYear();

  try {
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        sort_by: "vote_average.desc",
        first_air_date_year: year,
        "vote_count.gte": 100, // Optional: filter to avoid shows with few votes
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching top shows of the year:", error);
    return [];
  }
};
