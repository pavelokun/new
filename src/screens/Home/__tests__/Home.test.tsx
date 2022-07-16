import React from 'react';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {rest} from 'msw';
import {ReactTestInstance} from 'react-test-renderer';
import {API_URL} from 'react-native-dotenv';
import {EMPTY_MESSAGE, FETCH_ERROR} from '@root/constants/text';
import {server} from '@root/mocks/server';
import HomeScreen from '@root/screens/Home';
import {renderWithProviders} from '@root/utils/test-utils';

const renderHomeScreen = () => renderWithProviders(<HomeScreen />);

describe('Home screen', () => {
  test('renders with the list of genres', async () => {
    renderHomeScreen();

    // In the beginning there are no genres list
    let renderedGenres: ReactTestInstance[] | [];
    renderedGenres = screen.queryAllByLabelText('Movies List');
    expect(renderedGenres.length).toBe(0);

    // but there is a loader
    const loader = screen.getByLabelText('Loader');
    expect(loader).toBeTruthy();

    // and it disappears after movies fetching
    const result = await waitForElementToBeRemoved(() =>
      screen.queryByLabelText('Loader'),
    );

    expect(screen.queryByLabelText('Loader')).toBeNull();
    expect(result).toEqual(loader);

    // There are 4 rendered genres because FlatList has initialNumToRender = 4
    renderedGenres = screen.getAllByLabelText('Movies List');
    expect(renderedGenres.length).toBe(4);
  });

  test('renders with the error message', async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(401));
      }),
    );
    renderHomeScreen();

    let errorMessage: ReactTestInstance | null;
    errorMessage = screen.queryByText(FETCH_ERROR);
    expect(errorMessage).toBeNull();

    await waitFor(() => {
      errorMessage = screen.getByText(FETCH_ERROR);
      expect(errorMessage).toBeTruthy();
    });
  });

  test('renders with no list of genres', async () => {
    server.use(
      rest.get(API_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({movies: []}));
      }),
    );
    renderHomeScreen();

    let emptyMessage: ReactTestInstance | null;
    emptyMessage = screen.queryByText(EMPTY_MESSAGE);
    expect(emptyMessage).toBeNull();

    await waitFor(() => {
      emptyMessage = screen.getByText(EMPTY_MESSAGE);
      expect(emptyMessage).toBeTruthy();
    });
  });
});
