/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Rate } from 'antd';
import { format, parseISO } from 'date-fns';

import NotFound from '../NotFound';
import { postMovieRating } from '../../api/movies';

import styles from './MovieCard.module.scss';

const MovieCard = ({ vote_average, poster_path, release_date, title, genres, id, overview, sessionId, rating = 0 }) => {
  const [ratingValue, setRatingValue] = useState(rating);
  const color = () => {
    if (vote_average <= 3) {
      return 'red';
    }
    if (vote_average > 3 && vote_average <= 5) {
      return 'orange';
    }
    if (vote_average > 5 && vote_average <= 7) {
      return 'yellow';
    }
    return 'green';
  };
  const ratingColor = styles[color()];

  const onRatedClick = (value) => {
    postMovieRating(id, value, sessionId);
    setRatingValue(value);
  };
  return (
    <li className={styles.col}>
      <div className={styles.card}>
        {poster_path ? (
          <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster_path}`} alt={title} />
        ) : (
          <NotFound />
        )}

        <div className={styles.info}>
          <div className={styles.flex}>
            <h3>{title}</h3>
            <div className={`${ratingColor} ${styles.rating}`}>{vote_average.toFixed(1)}</div>
          </div>
          {release_date ? <p className={styles.date}>{format(parseISO(release_date), 'MMMM d, y')}</p> : ''}
          <ul className={styles.genres}>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
        <div className={styles.overview}>
          <p>{overview && `${overview.split(' ').slice(0, 15).join(' ')}...`}</p>
        </div>
        <Rate allowHalf value={ratingValue} onChange={onRatedClick} count={10} className={styles.stars} />
      </div>
    </li>
  );
};

export default MovieCard;
