import { createContext, useState, useEffect } from 'react';

export const FavoriteMoviesContext = createContext();

export const FavoriteMoviesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Load favorite movies from localStorage on initial render from user data


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('user')) || [];
    setFavoriteMovies(storedFavorites.favorites || []);
  }, []);

  const addFavoriteMovie = (movie) => {
    setFavoriteMovies((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, movie];
      localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), favorites: updatedFavorites }));
      return updatedFavorites;
    });
  };

  const removeFavoriteMovie = (movieId) => {
    setFavoriteMovies((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(movie => movie.id !== movieId);
      localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), favorites: updatedFavorites }));
      return updatedFavorites;
    });
  };

  return (
    <FavoriteMoviesContext.Provider value={{ favoriteMovies, addFavoriteMovie, removeFavoriteMovie }}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
}