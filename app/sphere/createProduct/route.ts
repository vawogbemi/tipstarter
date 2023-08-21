import { createProduct } from '@/lib/spherePayUtils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {

    const body = await req.json();

    const product = await createProduct(body.name, body.description, body.image)

    return NextResponse.json(
        product
    )
}