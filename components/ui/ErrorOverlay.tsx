import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from './Button';

interface Props {
  message: string;
  onConfirm: () => void;
}

export default function ErrorOverlay({ message, onConfirm }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
  },
});
