async function fetchMovies(queryValue, pageNumber) {
  const apiKey = '98895dfd0c8364d138fbea4128dcc6f7';
  const baseUrl = 'https://api.themoviedb.org/3/';
  const query = queryValue ? `query=${queryValue}` : 'query=return';
  const page = `page=${pageNumber}`;
  const urlMovies = `${baseUrl}search/movie?api_key=${apiKey}&include_adult=false&${page}&${query}`;
  const genreUrl = `${baseUrl}genre/movie/list?language=en&api_key=${apiKey}`;

  try {
    const resMovies = await fetch(urlMovies);
    const { results, total_results: total } = await resMovies.json();
    const resGenres = await fetch(genreUrl);
    const { genres } = await resGenres.json();

    const newMovies = results.map((movie) => {
      const newGenres = movie.genre_ids.map((genreId) => {
        return genres.find((elem) => elem.id === genreId);
      });
      return { ...movie, genres: newGenres };
    });

    return { results: newMovies, total, genres };
  } catch (err) {
    throw new Error('Oops... something went wrong');
  }
}

export default fetchMovies;
