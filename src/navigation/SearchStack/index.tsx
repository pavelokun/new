import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchStackParamsList, SearchStackScreens} from './types';
import SearchScreen from '@root/screens/Search';
import MovieScreen from '@root/screens/Movie';

const Stack = createNativeStackNavigator<SearchStackParamsList>();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SearchStackScreens.SearchScreen}
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SearchStackScreens.MovieScreen}
        component={MovieScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
