import {StyleSheet} from 'react-native';
import React from 'react';
import Text from '@root/components/Text';

type Props = {
  year: number;
  duration: string;
  director: string;
  cast: string;
  overview: string;
};

const MovieContent = ({year, duration, director, cast, overview}: Props) => {
  return (
    <>
      <Text body style={styles.subheader}>
        {year} | {duration} | {director}
      </Text>
      <Text body style={styles.cast}>
        {cast}
      </Text>
      <Text body style={styles.description}>
        {overview}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  subheader: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cast: {
    marginTop: 20,
  },
  description: {
    marginTop: 20,
  },
});

export default MovieContent;
