import Feed from "@/components/feed"
import MainNav from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabaseUtils"
import Link from "next/link"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export default async function MyProjects() {

    const supabase = createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! });

    const {
        data: { session },
    } = await supabase.auth.getSession()

    let { data } = await supabase.from("projects").select().eq("creator_id", session?.user.id)

    return (
        <div>
            <div>
                <MainNav session={session} />
            </div>
            <div className="flex mt-5">
                <div>
                    <h1 className="text-3xl font-helvetica pl-5">My Projects</h1>
                </div>
                <div className="mr-5 ml-auto">
                    <Link href={"/new-project"}>
                        <Button>
                            New Project
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-10">
                <Feed name={""} data={data} />
            </div>
        </div>
    )
}  