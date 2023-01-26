import { StyleSheet, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import { DUMMY_EXPENSES } from '../../data/expenses';
import { Expense } from '../../types/expenses';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

interface Props {
  expensesPeriod: string;
  expenses: Expense[];
}

export default function ExpensesOutput({ expensesPeriod, expenses }: Props) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
