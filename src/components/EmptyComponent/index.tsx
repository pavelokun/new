import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import Text from '../Text';

type Props = {
  message: string;
  style?: StyleProp<ViewStyle>;
};

const EmptyComponent = ({message, style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text body>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyComponent;
