import React, { useState, useEffect, useContext } from 'react';
import { Spin, Alert, Pagination } from 'antd';

import MovieCard from '../MovieCard';
import fetchMovies from '../../api/movies';
import CategoryContext from '../../context';

import styles from './MovieList.module.scss';

const MovieList = ({ movies, setMovies, queryValue, pageNumber, setPageNumber, addToRatedList }) => {
  const [totalMovies, setTotalMovies] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setCategories] = useContext(CategoryContext);

  useEffect(() => {
    setLoading(true);
    fetchMovies(queryValue, pageNumber)
      .then(({ results, total, genres }) => {
        setMovies(results);
        setCategories(genres);
        setTotalMovies(total);
        setLoading(false);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [queryValue, pageNumber]);

  const films = movies.map((movie) => (
    <MovieCard addToRatedList={addToRatedList} key={movie.id} className="card_wrapper" {...movie} />
  ));

  return (
    <div className={styles.wrapper}>
      {loading && <Spin className={styles.spin} size="large" />}
      {error && <Alert className={styles.alert} message="Error" description={error} type="error" showIcon />}
      <ul className={styles.list}>
        {!loading && !error && (
          <>
            {movies.length === 0 && (
              <Alert className={styles.noFound} message="Sorry - no results found :(" type="info" />
            )}
            {films}
          </>
        )}
      </ul>
      <div>
        <Pagination
          className={styles.pagination}
          defaultCurrent={pageNumber}
          pageSize={20}
          total={totalMovies}
          onChange={(page) => setPageNumber(page)}
        />
      </div>
    </div>
  );
};

export default MovieList;
