import React from 'react';

import styles from './TogglePage.module.scss';

const TogglePage = ({ setCurrentPage }) => {
  return (
    <div className={styles.root}>
      <button className={styles.search} onClick={() => setCurrentPage('search')}>
        Search
      </button>
      <button className={styles.rated} onClick={() => setCurrentPage('rated')}>
        Rated
      </button>
    </div>
  );
};

export default TogglePage;
