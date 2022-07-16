//https://github.com/testing-library/jest-native#usage
import '@testing-library/jest-native/extend-expect';
import {jest, beforeAll, afterAll, afterEach} from '@jest/globals';
import {server} from '@root/mocks/server';
import Promise from 'promise-polyfill';

//https://github.com/callstack/react-native-testing-library/issues/379#issuecomment-762597260
global.Promise = Promise;

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
// Use with React Native <= 0.63
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// Use this instead with React Native >= 0.64
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

//https://github.com/react-native-async-storage/async-storage/issues/379#issuecomment-660478051
jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: async (...args) => args,
    setItem: async (...args) => args,
    removeItem: async (...args) => args,
  };
});

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(() => server.close());
