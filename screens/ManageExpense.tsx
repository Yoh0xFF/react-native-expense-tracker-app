import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { StackNavParams } from '../App';
import ExpenseForm from '../components/manage-expense/ExpenseForm';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import IconButton from '../components/ui/IconButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { useExpensesStore } from '../store/expensesStore';
import { UpdateExpenseReq } from '../types/expenses';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

type ScreenProps = NativeStackScreenProps<StackNavParams, 'ManageExpense'>;

export default function ManageExpense({ route, navigation }: ScreenProps) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const expenses = useExpensesStore((store) => store.expenses);
  const dispatch = useExpensesStore((store) => store.dispatch);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const selectedExpense = expenses.find((el) => el.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (updateExpenseReq: UpdateExpenseReq) => {
    setIsSubmitting(true);
    try {
      if (!isEditing) {
        const expense = await storeExpense(updateExpenseReq);
        dispatch({
          type: 'ADD',
          expense,
        });
      } else {
        await updateExpense(expenseId, updateExpenseReq);
        dispatch({
          type: 'UPD',
          id: expenseId,
          req: updateExpenseReq,
        });
      }
      navigation.goBack();
    } catch (error) {
      setError('Failed to save the expense!');
    }
    setIsSubmitting(false);
  };
  const delExpenseHandler = async () => {
    if (expenseId == null) {
      return;
    }

    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId);
      dispatch({ type: 'DEL', id: expenseId });
      navigation.goBack();
    } catch (error) {
      setError('Failed to delete the expense!');
    }
    setIsSubmitting(false);
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  if (error != '' && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={() => setError('')} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        selectedExpense={selectedExpense}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />

      {isEditing && (
        <View style={styles.delContainer}>
          <IconButton
            icon='trash'
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={delExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  delContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
