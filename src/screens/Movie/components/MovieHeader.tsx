import {View, StyleSheet, Image, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {AirbnbRating} from 'react-native-ratings';
import Text from '@root/components/Text';
import {colors} from '@root/theme/colors';

type Props = {
  poster: string;
  title: string;
  rating: number;
  style?: StyleProp<ViewStyle>;
  backdropHeight: number;
};

const POSTER_HEIGHT = 180;
const POSTER_WIDTH = 120;

const MovieHeader = ({poster, title, rating, style, backdropHeight}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {marginTop: backdropHeight - POSTER_HEIGHT / 2},
        style,
      ]}>
      <Image source={{uri: poster}} style={styles.poster} />
      <View style={styles.titleRatingContainer}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} h2 style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            showRating={false}
            isDisabled
            size={30}
            defaultRating={rating / 2}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderWidth: 1,
    borderColor: colors.white,
  },
  titleRatingContainer: {
    flex: 1,
    height: 180,
    paddingHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    color: colors.white,
  },
  ratingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

export default MovieHeader;
