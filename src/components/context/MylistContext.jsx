import { createContext, useState, useEffect } from "react";

export const MylistContext = createContext();

export const MylistProvider = ({ children }) => {
  const [mylist, setMylist] = useState([]);

  useEffect(() => {
    const storedMylist = JSON.parse(localStorage.getItem('user')) || [];
    setMylist(storedMylist.mylist || []);
  }, []);

  const addToMylist = (movie) => {
    setMylist((prevList) => {
      const updatedList = [...prevList, movie];
      localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), mylist: updatedList }));
      return updatedList;
    });
  };

  const removeFromMylist = (movieId) => {
    setMylist((prevList) => {
      const updatedList = prevList.filter((movie) => movie.id !== movieId);
      localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), mylist: updatedList }));
      return updatedList;
    });
  };

  return (
    <MylistContext.Provider value={{ mylist, addToMylist, removeFromMylist }}>
      {children}
    </MylistContext.Provider>
  );
}