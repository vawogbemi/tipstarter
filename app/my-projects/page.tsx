import Feed from "@/components/feed"
import MainNav from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabaseUtils"
import Link from "next/link"

export default async function MyProjects() {

    const supabase = createServerSupabaseClient()
  
    const {
      data: { session },
    } = await supabase.auth.getSession()

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
                <Feed name={""}/>
            </div>
        </div>
    )
}  