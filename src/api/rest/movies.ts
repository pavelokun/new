import {API_URL} from 'react-native-dotenv';
import makeRequest from '../makeRequest';

export const getMovies = () => {
  return makeRequest({
    url: API_URL,
    method: 'GET',
    headers: {
      authorization: true,
    },
  });
};

export const getSearchedMovies = (searchValue: string) => {
  return makeRequest({
    url: API_URL,
    method: 'GET',
    headers: {
      authorization: true,
    },
    params: {q: searchValue},
  });
};
