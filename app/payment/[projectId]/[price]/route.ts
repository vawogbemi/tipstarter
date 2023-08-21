import { getPrice } from "@/lib/spherePayUtils";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { projectId: string, price: string } }
) {

    const price = await getPrice(params.price)

    const supabaseServer = createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! });
    
    const { data } = await supabaseServer.from("projects").select().eq("id", params.projectId)

    await supabaseServer.from("projects").update({ project_funding: data?.at(0)?.project_funding! + (price.unitAmount/1000000), project_num_supporters: data?.at(0)?.project_num_supporters! + 1 }).eq("id", params.projectId)

}