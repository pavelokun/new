import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '@root/hooks/redux';
import {fetchMovies} from '@root/store/reducers/moviesSlice';
import Loader from '@root/components/Loader';
import ErrorView from '@root/components/ErrorView';
import EmptyComponent from '@root/components/EmptyComponent';
import HomeScreenHeader from './components/HomeScreenHeader';
import {EMPTY_MESSAGE} from '@root/constants/text';
import {MoviesGroupItem} from '@root/types/MoviesGroupItem';
import MoviesList from './components/MoviesList';
import {HomeStackScreens} from '@root/navigation/HomeStack/types';

const renderItem = ({item}: {item: MoviesGroupItem}) => {
  const {genre, movies} = item;

  return <MoviesList genre={genre} movies={movies} />;
};

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const {error, status, moviesGroup} = useAppSelector(state => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  let content: React.ReactNode;

  if (status === 'idle' || status === 'loading') {
    content = <Loader />;
  } else if (status === 'succeeded') {
    content = (
      <FlatList
        data={moviesGroup}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.genre}
        ListHeaderComponent={HomeScreenHeader}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={4}
        ListEmptyComponent={<EmptyComponent message={EMPTY_MESSAGE} />}
      />
    );
  } else if (status === 'failed') {
    content = (
      <ErrorView message={error} onPress={() => dispatch(fetchMovies())} />
    );
  }

  return (
    <View
      style={[styles.container, {paddingTop: insets.top}]}
      accessibilityLabel={HomeStackScreens.HomeScreen}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default HomeScreen;
