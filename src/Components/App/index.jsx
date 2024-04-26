import React, { useState, useEffect } from 'react';

import './App.css';
import MovieList from '../MovieList';
import Search from '../Search';
import TogglePage from '../TogglePage';

const App = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [queryValue, setQueryValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return isOnline ? (
    <>
      <TogglePage />
      <Search
        queryValue={queryValue}
        setQueryValue={setQueryValue}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      <MovieList queryValue={queryValue} pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </>
  ) : (
    <h1>Connection is lost</h1>
  );
};

export default App;
