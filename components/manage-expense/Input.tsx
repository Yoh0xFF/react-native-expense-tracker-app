import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';

import { GlobalStyles } from '../../constants/styles';

interface Props {
  label: string;
  config?: TextInputProps;
}

export default function Input({ label, config }: Props) {
  const inputSyles: StyleProp<TextStyle>[] = [styles.input];

  if (config && config.multiline) {
    inputSyles.push(styles.inputMultiline);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputSyles} {...(config ?? {})} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
