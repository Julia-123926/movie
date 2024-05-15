import React, { useState, useEffect, useContext } from 'react';

import './App.css';
import MovieList from '../MovieList';
import Search from '../Search';
import TogglePage from '../TogglePage';
import Rated from '../Rated';
import { createGuestSession, fetchMovies, getGenres, fetchRatedMovies } from '../../api/movies';
import CategoryContext from '../../context';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [queryValue, setQueryValue] = useState('');
  const [pageNumberMovies, setPageNumberMovies] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState('search');
  const [sessionId, setSessionId] = useState('');
  const [categories, setCategories] = useContext(CategoryContext);
  const [genresLoaded, setGenresLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesData() {
    try {
      setLoading(true);
      const { results, total } = await fetchMovies(queryValue, pageNumberMovies);
      const newMovies = results.map((movie) => {
        const newGenres = movie.genre_ids.map((genreId) => {
          return categories.find((elem) => elem.id === genreId);
        });
        return { ...movie, genres: newGenres };
      });
      const ratedMovies = await fetchRatedMovies(pageNumberMovies, sessionId);
      if (ratedMovies?.results) {
        const rated = newMovies.map((elem) => {
          const ratedMovie = ratedMovies.results.find((item) => item.id === elem.id);
          if (ratedMovie) return { ...elem, rating: ratedMovie.rating };
          return elem;
        });
        setMovies(rated);
      } else setMovies(newMovies);

      setTotalMovies(total);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function fetchGenres() {
    try {
      const genres = await getGenres();
      setCategories(genres);
      const id = await createGuestSession();
      setSessionId(id);
    } catch (e) {
      setError(true);
    } finally {
      setGenresLoaded(true);
    }
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (genresLoaded && currentPage === 'search') {
      fetchMoviesData();
      window.scrollTo(0, 0);
    }
  }, [queryValue, pageNumberMovies, genresLoaded, currentPage]);

  const toggleTab = (page) => {
    setCurrentPage(page);
  };

  const updatePageNumberMovies = (page) => {
    setPageNumberMovies(page);
  };

  return (
    <div className="container">
      <TogglePage currentPage={currentPage} setCurrentPage={toggleTab} />
      {currentPage === 'search' ? (
        <>
          <Search setQueryValue={setQueryValue} />
          <MovieList
            totalMovies={totalMovies}
            movies={movies}
            pageNumberMovies={pageNumberMovies}
            setPageNumberMovies={updatePageNumberMovies}
            sessionId={sessionId}
            loading={loading}
            error={error}
          />
        </>
      ) : (
        <Rated sessionId={sessionId} />
      )}
    </div>
  );
};

export default App;
