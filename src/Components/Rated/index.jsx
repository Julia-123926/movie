/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';
import { Pagination } from 'antd';

import MovieCard from '../MovieCard';
import { fetchRatedMovies } from '../../api/movies';
import CategoryContext from '../../context';

import styles from './Rated.module.scss';

const Rated = ({ sessionId }) => {
  const [totalRated, setTotalRated] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useContext(CategoryContext);

  useEffect(() => {
    fetchRatedMovies(pageNumber, sessionId).then(({ total_results, results }) => {
      if (results) {
        const newMovies = results.map((movie) => {
          const newGenres = movie.genre_ids.map((genreId) => {
            return categories.find((elem) => elem.id === genreId);
          });
          return { ...movie, genres: newGenres };
        });
        setMovies(newMovies);

        setTotalRated(total_results);
      }
    });
    window.scrollTo(0, 0);
  }, [pageNumber]);

  const films = movies.map((movie) => (
    <MovieCard sessionId={sessionId} key={movie.id} className="card_wrapper" {...movie} />
  ));

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>{films}</ul>
      <Pagination
        className={styles.pagination}
        defaultCurrent={pageNumber}
        pageSize={20}
        total={totalRated}
        onChange={(page) => setPageNumber(page)}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Rated;
