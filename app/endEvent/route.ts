import { allPayments } from "@/lib/spherePayUtils";
import createCollectionAndMerkleTree from "@/tiplink/scripts/createCollectionAndMerkleTree";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const payments = await allPayments()

    const filteredPayments = payments.data.payments
        .filter((key: { status: string; }) => key.status === "succeeded")
        .map((key: { paymentLink: { lineItems: { price: any; }[]; }; }) => key.paymentLink.lineItems[0].price)
        .filter((key: { product: { id: any; }; }) => key.product.id === body.productId)
        .map((key: { name: any; unitAmount: any; }) => ({ name: key.name, unitAmount: Number((key.unitAmount/1000000)) }))


    const groupedPaymnets: any[] = []

    
    filteredPayments.reduce((res: { [x: string]: { name: any, unitAmount: any; }; }, value: { name: string | number; unitAmount: any; }) => {
        if (!res[value.name]) {
            res[value.name] = { name: value.name, unitAmount: 0 };
            groupedPaymnets.push(res[value.name])
        }
        res[value.name].unitAmount += value.unitAmount;
        return res;
        }, {});
    
    

    /*const supabaseServer = createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! });
    
    const { data: collectionData } = await supabaseServer.from("nft_collections").select().eq("id", body.projectId)
    
    const cd = collectionData?.at(0)

    const { data: nftData } = await supabaseServer.from("nfts").select().eq("id", body.projectId)

    createCollectionAndMerkleTree({collectionData: cd, nftData: nftData})*/

    return NextResponse.json(
        body
    )
}