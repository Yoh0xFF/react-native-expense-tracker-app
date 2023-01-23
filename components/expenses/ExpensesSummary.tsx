import { useMemo } from 'react';
import { Text, View } from 'react-native';

import { Expense } from '../../types/expenses';

interface Props {
  periodName: string;
  expenses: Expense[];
}

export default function ExpensesSummary({ expenses, periodName }: Props) {
  const expensesSum = useMemo(
    () => expenses.reduce((pre, crnt) => pre + crnt.amount, 0),
    [expenses]
  );

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
