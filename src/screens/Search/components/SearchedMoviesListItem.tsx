import {View, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  SearchStackParamsList,
  SearchStackScreens,
} from '@root/navigation/SearchStack/types';
import {Movie} from '@root/types/Movie';
import Text from '@root/components/Text';

type SearchedMoviesListItemNavigationProp = NativeStackNavigationProp<
  SearchStackParamsList,
  SearchStackScreens.SearchScreen
>;

const SearchedMoviesListItem = React.memo(({movie}: {movie: Movie}) => {
  const {title, released_on, cast, poster, id} = movie;
  const navigation = useNavigation<SearchedMoviesListItemNavigationProp>();
  const navigateToMovieScreen = () =>
    navigation.navigate(SearchStackScreens.MovieScreen, {
      id,
      title,
    });
  const year = new Date(released_on).getFullYear();

  return (
    <Pressable
      style={styles.container}
      onPress={navigateToMovieScreen}
      accessibilityLabel="Searched Movies List Item">
      <Image source={{uri: poster}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={2} h3>
          {title}
        </Text>
        <Text body>{year}</Text>
        <Text numberOfLines={1} body>
          {cast.join(', ')}
        </Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
});

export default SearchedMoviesListItem;
