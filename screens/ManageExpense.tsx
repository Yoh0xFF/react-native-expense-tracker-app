import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { StackNavParams } from '../App';
import ExpenseForm from '../components/manage-expense/ExpenseForm';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useExpensesStore } from '../store/expensesStore';
import { UpdateExpenseReq } from '../types/expenses';

type ScreenProps = NativeStackScreenProps<StackNavParams, 'ManageExpense'>;

export default function ManageExpense({ route, navigation }: ScreenProps) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const expenses = useExpensesStore((store) => store.expenses);
  const dispatch = useExpensesStore((store) => store.dispatch);

  const selectedExpense = expenses.find((el) => el.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = (updateExpenseReq: UpdateExpenseReq) => {
    if (!isEditing) {
      dispatch({
        type: 'ADD',
        req: updateExpenseReq,
      });
    } else {
      dispatch({
        type: 'UPD',
        id: expenseId,
        req: updateExpenseReq,
      });
    }
    navigation.goBack();
  };
  const delExpenseHandler = () => {
    if (expenseId == null) {
      return;
    }
    dispatch({ type: 'DEL', id: expenseId });
    navigation.goBack();
  };

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
