import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';

import {renderWithProviders} from '@root/utils/test-utils';
import SearchStack from '@root/navigation/SearchStack';

const renderSearchStack = () => renderWithProviders(<SearchStack />);

describe('Search stack', () => {
  test('navigates to movie screen', async () => {
    renderSearchStack();

    const renderedMovies = await screen.findAllByLabelText(
      'Searched Movies List Item',
    );
    fireEvent.press(renderedMovies[0]);

    const title = screen.getByText('The Dark Knight');
    expect(title).toBeTruthy();
  });
});
