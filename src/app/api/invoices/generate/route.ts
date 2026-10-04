import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientId, clientName, monthlyFee, billingCycleDate } = body;

    if (!clientId || !monthlyFee) {
      return NextResponse.json({ error: 'Missing required invoice parameters' }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    const invoicesRef = collection(db, 'retainer_contracts');
    const newInvoice = {
      clientId,
      clientName: clientName || 'Enterprise Client',
      monthlyFee: Number(monthlyFee),
      billingCycleDate: billingCycleDate || new Date().toISOString(),
      status: 'Awaiting Payment',
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(invoicesRef, newInvoice);

    return NextResponse.json({
      success: true,
      invoiceId: docRef.id,
      message: 'Invoice successfully generated and logged as Awaiting Payment.'
    });
  } catch (error) {
    console.error('Invoice generation error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
