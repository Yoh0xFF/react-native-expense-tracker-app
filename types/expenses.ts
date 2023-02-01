export interface Expense {
  id: string;
  amount: number;
  desc: string;
  date: Date;
}

export interface UpdateExpenseReq {
  amount: number;
  desc: string;
  date: Date;
}
