import React, { useState, useEffect } from 'react';
import { Row, Spin, Alert, Pagination } from 'antd';

import MovieCard from '../MovieCard';

import styles from './MovieList.module.scss';

const MovieList = ({ queryValue, pageNumber, setPageNumber }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const apiKey = '98895dfd0c8364d138fbea4128dcc6f7';
    const baseUrl = 'https://api.themoviedb.org/3/';
    const query = queryValue ? `query=${queryValue}` : 'query=return';
    const page = `page=${pageNumber}`;
    const url = `${baseUrl}search/movie?api_key=${apiKey}&include_adult=false&${page}&${query}`;

    async function fetchData() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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
          // defaultPageSize={6}
          total={movies.length}
          onChange={(page) => setPageNumber(page)}
        />
      </div>
    </div>
  );
};

export default MovieList;
