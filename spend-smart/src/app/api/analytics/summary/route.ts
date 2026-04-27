import { NextResponse } from 'next/server';
import { transactions } from '@/data/mock';

export async function GET() {
  const totalSpent = transactions
    .filter(t => t.type === 'DEBIT')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const totalIncome = transactions
    .filter(t => t.type === 'CREDIT')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const categoryBreakdown = transactions
    .filter(t => t.type === 'DEBIT')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return NextResponse.json({
    totalSpent,
    totalIncome,
    balance: totalIncome - totalSpent,
    categoryBreakdown
  });
}
