import { View } from 'react-native';

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
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}
