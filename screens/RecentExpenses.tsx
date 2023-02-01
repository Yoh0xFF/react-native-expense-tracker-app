import { useCallback, useMemo } from 'react';

import ExpensesOutput from '../components/expenses/ExpensesOutput';
import { useExpensesStore } from '../store/expensesStore';
import { getDateMinusDays } from '../util/date';

interface Props {}

export default function AllExpenses({}: Props) {
  const expenses = useExpensesStore((store) => store.expenses);

  const recentExpenses = expenses.filter((el) => {
    const date = getDateMinusDays(new Date(), 7);
    return el.date > date;
  });

  return (
    <ExpensesOutput
      expensesPeriod='Last 7 Days'
      expenses={recentExpenses}
      fallbackText='No expenses registered for the last 7 days.'
    />
  );
}
