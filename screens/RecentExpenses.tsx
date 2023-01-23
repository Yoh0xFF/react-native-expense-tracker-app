import ExpensesOutput from '../components/expenses/ExpensesOutput';

interface Props {}

export default function AllExpenses({}: Props) {
  return <ExpensesOutput expensesPeriod='Last 7 Days' expenses={[]} />;
}
