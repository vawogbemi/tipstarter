import { addWallet } from '@/lib/spherePayUtils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {

    const body = await req.json();

    const wallet = await addWallet(body.address)

    return NextResponse.json(
        wallet
    )
}