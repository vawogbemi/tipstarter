import MainNav from "@/components/main-nav"
import { createServerSupabaseClient } from "@/lib/supabaseUtils"

export default async function Home() {

    const supabase = createServerSupabaseClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <div>
            <div>
                <MainNav session={session} />
            </div>
        </div>
    )

}