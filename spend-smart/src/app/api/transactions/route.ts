import { NextResponse } from 'next/server';
import { transactions } from '@/data/mock';

export async function GET() {
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newTransaction = {
    id: `t${Date.now()}`,
    ...data,
    source: data.source || 'Manual',
    date: new Date().toISOString(),
  };
  // Push to mock array for the MVP session
  transactions.unshift(newTransaction);
  return NextResponse.json(newTransaction, { status: 201 });
}
