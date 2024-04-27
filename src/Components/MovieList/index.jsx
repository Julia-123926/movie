import React, { useState, useEffect } from 'react';
import { Row, Spin, Alert, Pagination } from 'antd';

import MovieCard from '../MovieCard';
import fetchMovies from '../../api/movies';

import styles from './MovieList.module.scss';

const MovieList = ({ queryValue, pageNumber, setPageNumber }) => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovies(queryValue, pageNumber)
      .then(({ results, total }) => {
        setMovies(results);
        setTotalMovies(total);
        setLoading(false);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [queryValue, pageNumber]);

  const films = movies.map((movie) => <MovieCard key={movie.id} className="card_wrapper" movie={movie} />);

  return (
    <div className={styles.wrapper}>
      <Row justify="center" className={styles.row}>
        {loading && <Spin size="large" />}
        {error && <Alert message="Error" description={error} type="error" showIcon />}
        {!loading && !error && (
          <>
            {movies.length === 0 && (
              <Alert className={styles.noFound} message="Sorry - no results found :(" type="info" />
            )}
            {films}
          </>
        )}
      </Row>
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
