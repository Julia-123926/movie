// получение списка фильмов

export async function fetchMovies(queryValue, page) {
  const apiKey = 'ef249d6aa7b5d4a25703f9d97cc984e9';
  const baseUrl = 'https://api.themoviedb.org/3/';
  const query = queryValue ? `query=${queryValue}` : 'query=return';
  const urlMovies = `${baseUrl}search/movie?api_key=${apiKey}&include_adult=false&page=${page}&${query}`;

  try {
    const resMovies = await fetch(urlMovies);
    const { results, total_results: total } = await resMovies.json();
    return { results, total };
  } catch (err) {
    return null;
  }
}

// запрос жанров
export async function getGenres() {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  const apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjI0OWQ2YWE3YjVkNGEyNTcwM2Y5ZDk3Y2M5ODRlOSIsInN1YiI6IjY2MTZhZjQ4ODczZjAwMDE2NDkxN2Q3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XF0gShlmkaijJMtV3DfS3UzR5nHdAYoHAH1kZrInhMY';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.genres;
  } catch (err) {
    return null;
  }
}

// создание гостевой сессии

export async function createGuestSession() {
  const url = 'https://api.themoviedb.org/3/authentication/guest_session/new';
  const apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjI0OWQ2YWE3YjVkNGEyNTcwM2Y5ZDk3Y2M5ODRlOSIsInN1YiI6IjY2MTZhZjQ4ODczZjAwMDE2NDkxN2Q3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XF0gShlmkaijJMtV3DfS3UzR5nHdAYoHAH1kZrInhMY';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.guest_session_id;
  } catch (err) {
    throw new Error('failed to create guest session');
  }
}

// отправление оцененных фильмов

export async function postMovieRating(movieId, rating, sessionId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`;
  const apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjI0OWQ2YWE3YjVkNGEyNTcwM2Y5ZDk3Y2M5ODRlOSIsInN1YiI6IjY2MTZhZjQ4ODczZjAwMDE2NDkxN2Q3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XF0gShlmkaijJMtV3DfS3UzR5nHdAYoHAH1kZrInhMY';
  await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ value: rating }),
  });
}

// получение оцененных фильмов

export async function fetchRatedMovies(page, sessionId) {
  const apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjI0OWQ2YWE3YjVkNGEyNTcwM2Y5ZDk3Y2M5ODRlOSIsInN1YiI6IjY2MTZhZjQ4ODczZjAwMDE2NDkxN2Q3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XF0gShlmkaijJMtV3DfS3UzR5nHdAYoHAH1kZrInhMY';
  const url = `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const resMovies = await fetch(url, options);
    const data = await resMovies.json();
    return data;
  } catch (err) {
    throw new Error('Oops... something went wrong');
  }
}
