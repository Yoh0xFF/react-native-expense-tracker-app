import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
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
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },

  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary400,
  },
});
