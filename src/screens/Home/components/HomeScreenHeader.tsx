import {StyleSheet} from 'react-native';
import React from 'react';
import Text from '@root/components/Text';
import {HOME_SCREEN_HEADER} from '@root/constants/text';

const HomeScreenHeader = () => {
  return (
    <Text h1 style={styles.header}>
      {HOME_SCREEN_HEADER}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
  },
});

export default HomeScreenHeader;
