import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { StackNavParams } from '../App';
import ExpenseForm from '../components/manage-expense/ExpenseForm';
import Button from '../components/ui/Button';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useExpensesStore } from '../store/expensesStore';

type ScreenProps = NativeStackScreenProps<StackNavParams, 'ManageExpense'>;

export default function ManageExpense({ route, navigation }: ScreenProps) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const dispatch = useExpensesStore((store) => store.dispatch);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    if (!isEditing) {
      dispatch({
        type: 'ADD',
        req: {
          desc: 'Add test expense',
          amount: 17.07,
          date: new Date('2023-02-01'),
        },
      });
    } else {
      dispatch({
        type: 'UPD',
        id: expenseId,
        req: {
          desc: 'Update test expense',
          amount: 17.07,
          date: new Date('2023-02-01'),
        },
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
      <ExpenseForm />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  delContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
