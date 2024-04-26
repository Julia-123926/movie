import React from 'react';
import { debounce } from 'lodash';
import { Input } from 'antd';

import styles from './Search.module.scss';

const Search = ({ setQueryValue }) => {
  const delayedQueryValue = debounce(setQueryValue, 500);
  return (
    <Input
      className={styles.input}
      placeholder="Type to search..."
      size="large"
      onChange={(e) => delayedQueryValue(e.target.value)}
    />
  );
};

export default Search;
