import React from 'react';

import MovieCard from '../MovieCard';

import styles from './Rated.module.scss';

const Rated = ({ ratedMovies, addToRatedList }) => {
  const films = ratedMovies.map((movie) => (
    <MovieCard addToRatedList={addToRatedList} key={movie.id} className="card_wrapper" {...movie} />
  ));

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>{films}</ul>
    </div>
  );
};

export default Rated;
