import React from 'react';
import { Col } from 'antd';
import { format, parseISO } from 'date-fns';

import NotFound from '../NotFound';

import styles from './MovieCard.module.scss';

const MovieCard = ({ movie }) => {
  return (
    <Col className={styles.col}>
      <div className={styles.card}>
        {movie.poster_path ? (
          <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt={movie.title} />
        ) : (
          <NotFound />
        )}

        <div className={styles.info}>
          <h3>{movie.title}</h3>
          {movie.release_date ? <p className={styles.date}>{format(parseISO(movie.release_date), 'MMMM d, y')}</p> : ''}
          <p className={styles.overview}>
            {movie.overview && `${movie.overview.split(' ').slice(0, 30).join(' ')}...`}
          </p>
        </div>
      </div>
    </Col>
  );
};

export default MovieCard;
