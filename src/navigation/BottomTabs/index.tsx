import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabsParamsList, BottomTabsScreens} from './types';
import getScreenOptions from './screenOptions';
import HomeStack from '../HomeStack';
import SearchStack from '../SearchStack';

const BottomTabNavigator = createBottomTabNavigator<BottomTabsParamsList>();

const BottomTabs = () => {
  const screenOptions = getScreenOptions();
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        name={BottomTabsScreens.HomeStack}
        component={HomeStack}
        options={screenOptions[BottomTabsScreens.HomeStack]}
      />
      <BottomTabNavigator.Screen
        name={BottomTabsScreens.SearchStack}
        component={SearchStack}
        options={screenOptions[BottomTabsScreens.SearchStack]}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomTabs;
