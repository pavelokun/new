import React from 'react';
import {fireEvent, screen} from '@testing-library/react-native';
import {HomeStackScreens} from '@root/navigation/HomeStack/types';
import {SEARCH_INPUT_PLACEHOLDER} from '@root/constants/text';
import {renderWithProviders} from '@root/utils/test-utils';
import BottomTabs from '@root/navigation/BottomTabs';

const renderBottomTabs = () => renderWithProviders(<BottomTabs />);

describe('Bottom Tabs', () => {
  test('navigates to search screen', async () => {
    renderBottomTabs();

    const searchTabButton = await screen.findByLabelText('Search Tab');
    fireEvent.press(searchTabButton);

    const textInput = screen.getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER);
    expect(textInput).toBeTruthy();
  });

  test('navigates to search screen and back to home screen', async () => {
    renderBottomTabs();

    const searchTabButton = await screen.findByLabelText('Search Tab');
    fireEvent.press(searchTabButton);

    const textInput = screen.getByPlaceholderText(SEARCH_INPUT_PLACEHOLDER);
    expect(textInput).toBeTruthy();

    const homeTabButton = await screen.findByLabelText('Home Tab');
    fireEvent.press(homeTabButton);

    const homeScreen = screen.getByLabelText(HomeStackScreens.HomeScreen);
    expect(homeScreen).toBeTruthy();
  });
});
