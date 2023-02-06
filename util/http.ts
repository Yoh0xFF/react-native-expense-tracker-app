import axios from 'axios';

import { Expense, UpdateExpenseReq } from '../types/expenses';

type ResponseType = {
  [key: string]: {
    amount: number;
    desc: string;
    date: Date;
  };
};

const baseUrl = 'firebase-url';

export async function storeExpense(
  updateExpenseReq: UpdateExpenseReq
): Promise<Expense> {
  const response = await axios.post(
    `${baseUrl}/expenses.json`,
    updateExpenseReq
  );

  const id = response.data.name;
  return {
    id,
    ...updateExpenseReq,
  };
}

export async function fetchExpenses(): Promise<Expense[]> {
  const response = await axios.get<ResponseType>(`${baseUrl}/expenses.json`);
  const data = response.data;

  const expenses: Expense[] = [];
  for (const key in data) {
    const entry = data[key];

    expenses.push({
      id: key,
      amount: entry.amount,
      date: entry.date,
      desc: entry.desc,
    });
  }

  return expenses;
}

export async function updateExpense(
  id: string,
  updateExpenseReq: UpdateExpenseReq
) {
  await axios.put(`${baseUrl}/expenses/${id}.json`, updateExpenseReq);
}

export async function deleteExpense(id: string) {
  await axios.delete(`${baseUrl}/expenses/${id}.json`);
}
