export type Transaction = {
  id: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
  category: string;
  merchantName: string;
  paymentMode: string;
  date: string;
};

export const transactions: Transaction[] = [
  {
    id: 't1',
    amount: 150,
    type: 'DEBIT',
    category: 'Food',
    merchantName: 'Swiggy',
    paymentMode: 'UPI',
    date: new Date().toISOString()
  },
  {
    id: 't2',
    amount: 5000,
    type: 'CREDIT',
    category: 'Other',
    merchantName: 'Dad',
    paymentMode: 'UPI',
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 't3',
    amount: 499,
    type: 'DEBIT',
    category: 'Subscriptions',
    merchantName: 'Netflix',
    paymentMode: 'CARD',
    date: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 't4',
    amount: 850,
    type: 'DEBIT',
    category: 'Travel',
    merchantName: 'Uber',
    paymentMode: 'UPI',
    date: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 't5',
    amount: 200,
    type: 'DEBIT',
    category: 'Academics',
    merchantName: 'Campus Bookstore',
    paymentMode: 'CASH',
    date: new Date(Date.now() - 4 * 86400000).toISOString()
  }
];

export const budgets = [
  { id: 'b1', category: 'Food', limitAmount: 3000, month: '2026-04' },
  { id: 'b2', category: 'Travel', limitAmount: 2000, month: '2026-04' },
];
