import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import { Expense, UpdateExpenseReq } from '../../types/expenses';
import { formatDate } from '../../util/date';
import Button from '../ui/Button';
import Input from './Input';

interface Props {
  selectedExpense?: Expense;
  submitButtonLabel: string;
  onSubmit: (updateExpenseReq: UpdateExpenseReq) => void;
  onCancel: () => void;
}

export default function ExpenseForm({
  selectedExpense,
  submitButtonLabel,
  onSubmit,
  onCancel,
}: Props) {
  const [inputs, setInputs] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: selectedExpense ? formatDate(selectedExpense.date) : '',
      isValid: true,
    },
    desc: {
      value: selectedExpense ? selectedExpense.desc : '',
      isValid: true,
    },
  });

  const inputChangedHandler = (inputName: string, enteredText: string) => {
    setInputs((preState) => ({
      ...preState,
      [inputName]: { value: enteredText, isValid: true },
    }));
  };

  const submitHandler = () => {
    const updateExpenseReq: UpdateExpenseReq = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      desc: inputs.desc.value,
    };

    const amountIsValid =
      !isNaN(updateExpenseReq.amount) && updateExpenseReq.amount > 0;
    const dateIsValid = updateExpenseReq.date.toString() !== 'Invalid Date';
    const descIsValid = updateExpenseReq.desc.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      setInputs((pre) => {
        return {
          amount: { value: pre.amount.value, isValid: amountIsValid },
          date: { value: pre.date.value, isValid: dateIsValid },
          desc: { value: pre.desc.value, isValid: descIsValid },
        };
      });
      return;
    }

    onSubmit(updateExpenseReq);
  };

  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.desc.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          invalid={!inputs.amount.isValid}
          config={{
            keyboardType: 'decimal-pad',
            onChangeText: (enteredText) =>
              inputChangedHandler('amount', enteredText),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label='Date'
          invalid={!inputs.date.isValid}
          config={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (enteredText) =>
              inputChangedHandler('date', enteredText),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputs.desc.isValid}
        config={{
          multiline: true,
          autoCorrect: false,
          onChangeText: (enteredText) =>
            inputChangedHandler('desc', enteredText),
          value: inputs.desc.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}

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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
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
