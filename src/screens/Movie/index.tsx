import {View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  HomeStackParamsList,
  HomeStackScreens,
} from '@root/navigation/HomeStack/types';
import {useAppSelector} from '@root/hooks/redux';
import {selectMovieById} from '@root/store/reducers/moviesSlice';
import ErrorView from '@root/components/ErrorView';
import {NO_MOVIE} from '@root/constants/text';
import MovieHeader from './components/MovieHeader';
import MovieContent from './components/MovieContent';

const {width} = Dimensions.get('window');

const BACKDROP_WIDTH = width;
const BACKDROP_HEIGHT = BACKDROP_WIDTH / 2;

type MovieScreenRouteProp = RouteProp<
  HomeStackParamsList,
  HomeStackScreens.MovieScreen
>;

const MovieScreen = () => {
  const route = useRoute<MovieScreenRouteProp>();
  const {id} = route.params;
  const movie = useAppSelector(state => selectMovieById(state, id));

  if (!movie) {
    return <ErrorView message={NO_MOVIE} />;
  }

  const {
    backdrop,
    poster,
    title,
    imdb_rating,
    released_on,
    length,
    cast,
    director,
    overview,
  } = movie;

  const year = new Date(released_on).getFullYear();

  return (
    <View style={styles.container}>
      <Image source={{uri: backdrop}} style={styles.backdrop} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieHeader
          backdropHeight={BACKDROP_HEIGHT}
          poster={poster}
          title={title}
          rating={imdb_rating}
        />
        <MovieContent
          year={year}
          duration={length}
          director={
            typeof director === 'string' ? director : director.join(', ')
          }
          cast={cast.join(', ')}
          overview={overview}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    position: 'relative',
  },
  backdrop: {
    position: 'absolute',
    width: BACKDROP_WIDTH,
    height: BACKDROP_HEIGHT,
  },
});

export default MovieScreen;
