import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomTabsScreens} from './types';

type GetTabOptionsParams = Partial<
  Record<BottomTabsScreens, BottomTabNavigationOptions>
>;

export default function getScreenOptions(): GetTabOptionsParams {
  return {
    [BottomTabsScreens.HomeStack]: {
      tabBarIcon: ({color, size}) => (
        <Ionicons name="md-home-sharp" size={size} color={color} />
      ),
      unmountOnBlur: true,
      headerShown: false,
      tabBarAccessibilityLabel: 'Home Tab',
    },
    [BottomTabsScreens.SearchStack]: {
      tabBarIcon: ({color, size}) => (
        <Ionicons name="md-search-sharp" size={size} color={color} />
      ),
      unmountOnBlur: true,
      headerShown: false,
      tabBarAccessibilityLabel: 'Search Tab',
    },
  };
}
