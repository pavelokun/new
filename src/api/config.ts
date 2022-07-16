import {API_TOKEN} from 'react-native-dotenv';
import {AxiosError} from 'axios';

export default {
  token: API_TOKEN,
  errorHandler: (error: AxiosError) => {
    if (error.response) {
      console.warn(
        `The server responded with a status code: ${error.response.status}`,
      );
    } else if (error.request) {
      console.warn('No response was received');
    } else {
      console.warn('Something happened in setting up the request');
    }
  },
};
