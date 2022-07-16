import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Button,
  TextStyle,
} from 'react-native';
import React from 'react';
import Text from '../Text';
import {RETRY_TEXT} from '@root/constants/text';
import {colors} from '@root/theme/colors';

type Props = {
  message: string | null;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonText?: string;
  onPress?: () => void;
};

function ErrorView({
  message,
  style,
  textStyle,
  buttonText = RETRY_TEXT,
  onPress,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text body style={[styles.message, textStyle]}>
        {message}
      </Text>
      {onPress && <Button onPress={onPress} title={buttonText} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: colors.error,
  },
});

export default ErrorView;
