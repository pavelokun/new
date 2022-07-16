import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

type Props = {
  size?: 'small' | 'large';
};

const Loader = ({size = 'large', ...props}: Props) => {
  return (
    <View style={styles.container} accessibilityLabel="Loader">
      <ActivityIndicator size={size} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
