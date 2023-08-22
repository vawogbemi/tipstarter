import { SOL_CONSTANT, getPrice } from "@/lib/spherePayUtils";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
     params: { params: { payment : [] } }
) {
    console.log(params)
    console.log(params.params.payment.at(0))

    const projectId = params.params.payment.at(0)
    const priceId = params.params.payment.at(1)
    
    const price = await getPrice(priceId!)

    const supabaseServer = await createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! });
    
    const { data } = await supabaseServer.from("projects").select().eq("id", projectId!)

    await supabaseServer.from("projects").update({ project_funding: (data?.at(0)?.project_funding! + (price.unitAmount/SOL_CONSTANT)), project_num_supporters: (data?.at(0)?.project_num_supporters! + 1) }).eq("id", projectId)
    
    console.log(data)
    console.log(price)
    
    return NextResponse.redirect(new URL('/', req.url))

}