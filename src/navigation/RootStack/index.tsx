import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '../BottomTabs';
import {RootStackParamsList, RootStackScreens} from './types';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={RootStackScreens.BottomTabs} component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default RootStack;
