import React from 'react';
import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {rest} from 'msw';
import {ReactTestInstance} from 'react-test-renderer';
import {API_URL} from 'react-native-dotenv';
import {
  EMPTY_MESSAGE,
  FETCH_ERROR,
  SEARCH_INPUT_PLACEHOLDER,
} from '@root/constants/text';
import {server} from '@root/mocks/server';
import {renderWithProviders} from '@root/utils/test-utils';
import SearchScreen from '@root/screens/Search';

const renderSearchScreen = () => renderWithProviders(<SearchScreen />);

describe('Search screen', () => {
  test('renders with the list of movies', async () => {
    renderSearchScreen();

    // In the beginning there are no movies list
    let renderedMovies: ReactTestInstance[] | [];
    renderedMovies = screen.queryAllByLabelText('Searched Movies List Item');
    expect(renderedMovies.length).toBe(0);

    // but there is a loader
    const loader = screen.getByLabelText('Loader');
    expect(loader).toBeTruthy();

    // and it disappears after movies fetching
    const result = await waitForElementToBeRemoved(() =>
      screen.queryByLabelText('Loader'),
    );

    expect(screen.queryByLabelText('Loader')).toBeNull();
    expect(result).toEqual(loader);

    // initialNumToRender = 5
    renderedMovies = screen.getAllByLabelText('Searched Movies List Item');
    expect(renderedMovies.length).toBe(5);
  });

  test('renders with the error message', async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(401));
      }),
    );
    renderSearchScreen();

    let errorMessage: ReactTestInstance | null;
    errorMessage = screen.queryByText(FETCH_ERROR);
    expect(errorMessage).toBeNull();

    await waitFor(() => {
      errorMessage = screen.getByText(FETCH_ERROR);
      expect(errorMessage).toBeTruthy();
    });
  });

  test('renders with no movies', async () => {
    renderSearchScreen();

    let emptyMessage: ReactTestInstance | null;
    emptyMessage = screen.queryByText(EMPTY_MESSAGE);
    expect(emptyMessage).toBeNull();

    const textInput = screen.getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER);
    expect(textInput).toBeTruthy();

    fireEvent.changeText(textInput, 'd');

    emptyMessage = await screen.findByText(EMPTY_MESSAGE);
    expect(emptyMessage).toBeTruthy();
  });

  test('renders with one movie', async () => {
    renderSearchScreen();

    let renderedMovies: ReactTestInstance[] | [];
    renderedMovies = screen.queryAllByLabelText('Searched Movies List Item');
    expect(renderedMovies.length).toBe(0);

    // initialNumToRender = 5
    renderedMovies = await screen.findAllByLabelText(
      'Searched Movies List Item',
    );
    expect(renderedMovies.length).toBe(5);

    const textInput = screen.getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER);
    expect(textInput).toBeTruthy();

    fireEvent.changeText(textInput, 'dark');

    await waitFor(() => {
      renderedMovies = screen.getAllByLabelText('Searched Movies List Item');
      expect(renderedMovies.length).toBe(1);
    });
  });
});
