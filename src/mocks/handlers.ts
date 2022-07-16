import {rest} from 'msw';
import {API_URL} from 'react-native-dotenv';
import allMovies from './mockedData.json';

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const searchValue = req.url.searchParams.get('q');
    if (searchValue === 'd') {
      return res(ctx.status(200), ctx.json({movies: []}));
    } else if (searchValue === 'dark') {
      return res(ctx.status(200), ctx.json({movies: [allMovies.movies[0]]}));
    }

    return res(ctx.status(200), ctx.json(allMovies));
  }),
];
