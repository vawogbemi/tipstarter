import { createPrice } from '@/lib/spherePayUtils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {

    const body = await req.json();
    
    const price = await createPrice(body.product, body.unitAmount)

    return NextResponse.json(
        price
    )
}