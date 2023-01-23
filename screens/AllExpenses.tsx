import ExpensesOutput from '../components/expenses/ExpensesOutput';

interface Props {}

export default function AllExpenses({}: Props) {
  return <ExpensesOutput expensesPeriod='Total' expenses={[]} />;
}
