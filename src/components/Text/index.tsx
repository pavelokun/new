import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text as NativeText,
  TextProps,
  TextStyle,
} from 'react-native';

type Props = TextProps & {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  body?: boolean;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

const Text = React.memo(
  ({h1, h2, h3, body, children, style, ...props}: Props) => {
    return (
      <NativeText
        {...props}
        style={[
          style,
          h1 && styles.h1,
          h2 && styles.h2,
          h3 && styles.h3,
          body && styles.body,
        ]}>
        {children}
      </NativeText>
    );
  },
);

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 20,
  },
});

export default Text;
