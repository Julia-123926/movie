import React, { useState } from 'react';

import './App.css';
import MovieList from '../MovieList';
import Search from '../Search';
import TogglePage from '../TogglePage';
import Rated from '../Rated';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [queryValue, setQueryValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState('search');
  const [ratedMovies, setRatedMovies] = useState([]);

  const toggleTab = (page) => {
    setCurrentPage(page);
  };

  const addToRatedList = (obj) => {
    const existingMovie = ratedMovies.find((item) => item.id === obj.id);
    if (existingMovie) {
      const copyMovies = ratedMovies.map((item) => {
        if (item.id === obj.id) {
          item.rating = obj.rating;
        }
        return item;
      });

      setRatedMovies(copyMovies);
    } else setRatedMovies((prev) => [...prev, obj]);
  };

  return (
    <div className="container">
      <TogglePage currentPage={currentPage} setCurrentPage={toggleTab} />

      {currentPage === 'search' ? (
        <>
          <Search setQueryValue={setQueryValue} />
          <MovieList
            setMovies={setMovies}
            movies={movies}
            queryValue={queryValue}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            addToRatedList={addToRatedList}
          />
        </>
      ) : (
        <Rated
          setRatedMovies={setRatedMovies}
          ratedMovies={ratedMovies}
          addToRatedList={addToRatedList}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}
    </div>
  );
};

export default App;
