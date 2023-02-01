import ExpensesOutput from '../components/expenses/ExpensesOutput';
import { useExpensesStore } from '../store/expensesStore';

interface Props {}

export default function AllExpenses({}: Props) {
  const expenses = useExpensesStore((store) => store.expenses);

  return (
    <ExpensesOutput
      expensesPeriod='Total'
      expenses={expenses}
      fallbackText='No registered expenses found.'
    />
  );
}
