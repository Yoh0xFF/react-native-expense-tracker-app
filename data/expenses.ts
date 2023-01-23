import { Expense } from '../types/expenses';

export const DUMMY_EXPENSES: Expense[] = [
  {
    id: 'e1',
    desc: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-01-07'),
  },
  {
    id: 'e2',
    desc: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-01-09'),
  },
  {
    id: 'e3',
    desc: 'Some bananas',
    amount: 5.99,
    date: new Date('2023-01-11'),
  },
  {
    id: 'e4',
    desc: 'A book',
    amount: 14.99,
    date: new Date('2023-01-17'),
  },
  {
    id: 'e5',
    desc: 'Another book',
    amount: 18.59,
    date: new Date('2023-01-19'),
  },
];
