import {Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  HomeStackParamsList,
  HomeStackScreens,
} from '@root/navigation/HomeStack/types';
import {Movie} from '@root/types/Movie';

type MoviesListItemNavigationProp = NativeStackNavigationProp<
  HomeStackParamsList,
  HomeStackScreens.HomeScreen
>;

const MoviesListItem = ({movie}: {movie: Movie}) => {
  const navigation = useNavigation<MoviesListItemNavigationProp>();
  const navigateToMovieScreen = () =>
    navigation.navigate(HomeStackScreens.MovieScreen, {
      id: movie.id,
      title: movie.title,
    });
  return (
    <Pressable
      style={styles.container}
      onPress={navigateToMovieScreen}
      accessibilityLabel="Movies List Item">
      <Image source={{uri: movie.poster}} style={styles.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
});

export default MoviesListItem;
