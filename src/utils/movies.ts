import {Movie} from '../types/Movie';

const groupMoviesByGenre = (movies: Movie[]) => {
  const genresWithMovies: {
    [key: string]: Movie[];
  } = {};
  movies.forEach(movie => {
    movie.genres.forEach(genre => {
      if (!genresWithMovies[genre]) {
        genresWithMovies[genre] = [];
      }
      genresWithMovies[genre].push(movie);
    });
  });

  const moviesGroup = Object.entries(genresWithMovies).map(
    ([genre, moviesByGenre]) => ({genre, movies: moviesByGenre}),
  );

  return moviesGroup;
};

export default groupMoviesByGenre;
