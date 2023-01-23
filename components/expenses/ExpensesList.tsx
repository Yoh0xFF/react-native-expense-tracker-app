import { FlatList } from 'react-native';

import { Expense } from '../../types/expenses';
import ExpenseItem from './ExpenseItem';

interface Props {
  expenses: Expense[];
}

export default function ExpensesList({ expenses }: Props) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(el) => el.id}
      renderItem={(el) => <ExpenseItem expense={el.item} />}
    />
  );
}
