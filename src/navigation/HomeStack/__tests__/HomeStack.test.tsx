import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';

import {renderWithProviders} from '@root/utils/test-utils';
import HomeStack from '@root/navigation/HomeStack';

const renderHomeStack = () => renderWithProviders(<HomeStack />);

describe('Home stack', () => {
  test('navigates to movie screen', async () => {
    renderHomeStack();

    const renderedMovies = await screen.findAllByLabelText('Movies List Item');
    fireEvent.press(renderedMovies[0]);

    const title = screen.getByText('The Dark Knight');
    expect(title).toBeTruthy();
  });
});
