import {View, StyleSheet, TextInputProps, TextInput} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SearchInput({...props}: TextInputProps) {
  return (
    <View style={styles.container}>
      <Ionicons style={styles.icon} name="md-search-sharp" size={20} />
      <TextInput autoFocus style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  input: {
    fontSize: 20,
  },
});

export default SearchInput;
