import { useEffect, useState } from 'react';

import ExpensesOutput from '../components/expenses/ExpensesOutput';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useExpensesStore } from '../store/expensesStore';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

interface Props {}

export default function AllExpenses({}: Props) {
  const expenses = useExpensesStore((store) => store.expenses);
  const dispatch = useExpensesStore((store) => store.dispatch);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        dispatch({ type: 'FETCH', expenses });
      } catch (error) {
        setError('Failed to fetch expenses!');
      }
      setIsLoading(false);
    };

    getExpenses();
  }, []);

  const recentExpenses = expenses.filter((el) => {
    const date = getDateMinusDays(new Date(), 7);
    return el.date > date;
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (error !== '' && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => setError('')} />;
  }

  return (
    <ExpensesOutput
      expensesPeriod='Last 7 Days'
      expenses={recentExpenses}
      fallbackText='No expenses registered for the last 7 days.'
    />
  );
}
