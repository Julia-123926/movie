import React from 'react';
import { Col, Rate } from 'antd';
import { format, parseISO } from 'date-fns';

import NotFound from '../NotFound';

import styles from './MovieCard.module.scss';

const MovieCard = ({ movie }) => {
  const color = () => {
    if (movie.vote_average <= 3) {
      return 'red';
    }
    if (movie.vote_average > 3 && movie.vote_average <= 5) {
      return 'orange';
    }
    if (movie.vote_average > 5 && movie.vote_average <= 7) {
      return 'yellow';
    }
    return 'green';
  };
  const ratingColor = styles[color()];
  return (
    <Col className={styles.col}>
      <div className={styles.card}>
        {movie.poster_path ? (
          <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt={movie.title} />
        ) : (
          <NotFound />
        )}

        <div className={styles.info}>
          <div className={styles.flex}>
            <h3>{movie.title}</h3>
            <div className={`${ratingColor} ${styles.rating}`}>{movie.vote_average.toFixed(1)}</div>
          </div>
          {movie.release_date ? <p className={styles.date}>{format(parseISO(movie.release_date), 'MMMM d, y')}</p> : ''}
          <div className={styles.genres}>
            {movie.genres.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
          <p className={styles.overview}>
            {movie.overview && `${movie.overview.split(' ').slice(0, 15).join(' ')}...`}
          </p>
          <Rate count={10} className={styles.stars} />
        </div>
      </div>
    </Col>
  );
};

export default MovieCard;
