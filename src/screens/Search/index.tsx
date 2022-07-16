import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '@root/hooks/redux';
import useDebounce from '@root/hooks/useDebounce';
import {fetchSearchedMovies} from '@root/store/reducers/searchedMoviesSlice';
import Loader from '@root/components/Loader';
import EmptyComponent from '@root/components/EmptyComponent';
import {EMPTY_MESSAGE, SEARCH_INPUT_PLACEHOLDER} from '@root/constants/text';
import SearchInput from '@root/components/SearchInput';
import ErrorView from '@root/components/ErrorView';
import {Movie} from '@root/types/Movie';
import SearchedMoviesListItem from './components/SearchedMoviesListItem';

const DELAY = 300;

const renderItem = ({item}: {item: Movie}) => {
  return <SearchedMoviesListItem movie={item} />;
};

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const {error, status, searchedMovies} = useAppSelector(
    state => state.searchedMovies,
  );

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, DELAY);
  useEffect(() => {
    dispatch(fetchSearchedMovies(debouncedSearchValue));
  }, [dispatch, debouncedSearchValue]);

  const renderListEmpty = () => {
    if (status === 'idle' || status === 'loading') {
      return <Loader />;
    }
    return <EmptyComponent message={EMPTY_MESSAGE} />;
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <SearchInput
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder={SEARCH_INPUT_PLACEHOLDER}
      />
      {status === 'failed' ? (
        <ErrorView
          message={error}
          onPress={() => dispatch(fetchSearchedMovies(searchValue))}
        />
      ) : (
        <FlatList
          data={searchedMovies}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainer}
          initialNumToRender={5}
          ListEmptyComponent={renderListEmpty}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default SearchScreen;
