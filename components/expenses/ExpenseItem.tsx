import { Text, View } from 'react-native';

import { Expense } from '../../types/expenses';

interface Props {
  expense: Expense;
}

export default function ExpenseItem({ expense }: Props) {
  return (
    <View>
      <Text>{expense.desc}</Text>
    </View>
  );
}
