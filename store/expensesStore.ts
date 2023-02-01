import { create } from 'zustand';

import { DUMMY_EXPENSES } from '../data/expenses';
import { Expense, UpdateExpenseReq } from '../types/expenses';

export type ExpenseStoreAction =
  | { type: 'ADD'; req: UpdateExpenseReq }
  | { type: 'DEL'; id: string }
  | { type: 'UPD'; id: string; req: UpdateExpenseReq };

interface StoreDataType {
  expenses: Expense[];
}

interface StoreMutationType {
  dispatch: (action: ExpenseStoreAction) => void;
}

type StoreType = StoreDataType & StoreMutationType;

const reducer = (
  state: StoreDataType,
  action: ExpenseStoreAction
): StoreDataType => {
  const { type } = action;
  const { expenses: preExpenses } = state;

  switch (type) {
    case 'ADD': {
      const { req } = action;

      return {
        expenses: [
          {
            id: `e${new Date().getTime()}`,
            ...req,
          },
          ...preExpenses,
        ],
      };
    }
    case 'UPD': {
      const { id, req } = action;

      const k = preExpenses.findIndex((el) => el.id === id);
      const updatedExpense = { ...preExpenses[k], ...req };

      const newExpenses = [...preExpenses];
      newExpenses[k] = updatedExpense;

      return {
        expenses: newExpenses,
      };
    }
    case 'DEL': {
      const { id } = action;

      return {
        expenses: preExpenses.filter((el) => el.id !== id),
      };
    }
  }
};

export const useExpensesStore = create<StoreType>((set) => ({
  expenses: DUMMY_EXPENSES,
  dispatch: (action: ExpenseStoreAction) =>
    set((state) => reducer(state, action)),
}));
