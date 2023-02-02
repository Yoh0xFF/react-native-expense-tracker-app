import React from 'react';
import { StyleSheet, View } from 'react-native';

import Input from './Input';

interface Props {}

export default function ExpenseForm({}: Props) {
  const amountChangedHandler = () => {};
  const dateChangedHandler = () => {};

  return (
    <View>
      <Input
        label='Amount'
        config={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangedHandler,
        }}
      />
      <Input
        label='Date'
        config={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: dateChangedHandler,
        }}
      />
      <Input
        label='Description'
        config={{
          multiline: true,
          autoCorrect: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
