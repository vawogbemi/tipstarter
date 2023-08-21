import { createPaymentLink, createPrice } from '@/lib/spherePayUtils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {

    const body = await req.json();

    const paymentLink = await createPaymentLink(body.lineItems)

    return NextResponse.json(
        paymentLink
    )
}