import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!).update(sign).digest('hex')
    if (razorpay_signature === expectedSign) {
      return NextResponse.json({ verified: true, paymentId: razorpay_payment_id })
    }
    return NextResponse.json({ verified: false }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
