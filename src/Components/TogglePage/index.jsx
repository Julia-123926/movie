import React from 'react';

import styles from './TogglePage.module.scss';

const TogglePage = () => {
  return (
    <div className={styles.root}>
      <button className={styles.search}>Search</button>
      <button className={styles.rated}>Rated</button>
    </div>
  );
};

export default TogglePage;
