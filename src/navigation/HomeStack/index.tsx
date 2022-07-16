import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamsList, HomeStackScreens} from './types';
import HomeScreen from '@root/screens/Home';
import MovieScreen from '@root/screens/Movie';

const Stack = createNativeStackNavigator<HomeStackParamsList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeStackScreens.HomeScreen}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={HomeStackScreens.MovieScreen}
        component={MovieScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
