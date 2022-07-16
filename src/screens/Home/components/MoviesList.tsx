import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {Movie} from '@root/types/Movie';
import {MoviesGroupItem} from '@root/types/MoviesGroupItem';
import Text from '@root/components/Text';
import MoviesListItem from './MoviesListItem';

const renderItem = ({item}: {item: Movie}) => {
  return <MoviesListItem movie={item} />;
};

const MoviesList = ({genre, movies}: MoviesGroupItem) => {
  return (
    <View style={styles.container} accessibilityLabel="Movies List">
      <Text h2 style={styles.title}>
        {genre}
      </Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        initialNumToRender={4}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingTop: 20,
  },
  title: {
    marginBottom: 10,
  },
});

export default MoviesList;
