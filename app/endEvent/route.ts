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
        .map((key: { name: any; unitAmountDecimal: any; }) => ({ name: key.name, unitAmountDecimal: Number((key.unitAmountDecimal)) }))


    const totalPayments: any[] = []

    
    filteredPayments.reduce((res: { [x: string]: { name: any, unitAmountDecimal: any; }; }, value: { name: string | number; unitAmountDecimal: any; }) => {
        if (!res[value.name]) {
            res[value.name] = { name: value.name, unitAmountDecimal: 0 };
            totalPayments.push(res[value.name])
        }
        res[value.name].unitAmountDecimal += value.unitAmountDecimal;
        return res;
        }, {});
    
    const supabaseServer = createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! });
    
    const { data: projectData } = await supabaseServer.from("projects").select().eq("id", body.projectId)

    const pd = projectData?.at(0)

    const { data: collectionData } = await supabaseServer.from("nft_collections").select().eq("project_id", body.projectId)
    
    const cd = collectionData?.at(0)

    const { data: nftData } = await supabaseServer.from("nfts").select().eq("project_id", body.projectId)
    
    await createCollectionAndMerkleTree({collectionData: cd, nftData: nftData, totalPayments: totalPayments, creatorTipLink: pd?.tiplink })

    return new Response()

}