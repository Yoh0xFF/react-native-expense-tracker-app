import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { UpdateExpenseReq } from '../../types/expenses';
import Button from '../ui/Button';
import Input from './Input';

interface Props {
  submitButtonLabel: string;
  onSubmit: (updateExpenseReq: UpdateExpenseReq) => void;
  onCancel: () => void;
}

export default function ExpenseForm({
  submitButtonLabel,
  onSubmit,
  onCancel,
}: Props) {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    desc: '',
  });

  const inputChangedHandler = (inputName: string, enteredText: string) => {
    setInputValues((preState) => ({
      ...preState,
      [inputName]: enteredText,
    }));
  };

  const submitHandler = () => {
    const updateExpenseReq: UpdateExpenseReq = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      desc: inputValues.desc,
    };

    onSubmit(updateExpenseReq);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          config={{
            keyboardType: 'decimal-pad',
            onChangeText: (enteredText) =>
              inputChangedHandler('amount', enteredText),
            value: inputValues.amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label='Date'
          config={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (enteredText) =>
              inputChangedHandler('date', enteredText),
            value: inputValues.date,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label='Description'
        config={{
          multiline: true,
          autoCorrect: false,
          onChangeText: (enteredText) =>
            inputChangedHandler('desc', enteredText),
          value: inputValues.desc,
        }}
      />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
