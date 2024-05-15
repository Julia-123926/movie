import { Spin, Alert, Pagination } from 'antd';

import MovieCard from '../MovieCard';

import styles from './MovieList.module.scss';

const MovieList = ({ movies, pageNumberMovies, setPageNumberMovies, sessionId, totalMovies, loading, error }) => {
  const films = movies.map((movie) => (
    <MovieCard sessionId={sessionId} key={movie.id} className="card_wrapper" {...movie} />
  ));

  return (
    <div className={styles.wrapper}>
      {loading && <Spin className={styles.spin} size="large" />}
      {error && (
        <Alert
          className={styles.alert}
          message="Oops, something went wrong :("
          description={error}
          type="info"
          showIcon
        />
      )}
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
          defaultCurrent={pageNumberMovies}
          pageSize={20}
          total={totalMovies}
          onChange={(page) => setPageNumberMovies(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MovieList;
