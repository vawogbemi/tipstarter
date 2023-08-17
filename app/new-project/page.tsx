import MainNav from "@/components/main-nav"
import ProjectForm from "@/components/new-project-form"

import { createServerSupabaseClient } from "@/lib/supabaseUtils"

export default async function NewProject() {

    const supabase = createServerSupabaseClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()


    return (
        <div>
            <div>
                <MainNav session={session} />
            </div>
            <ProjectForm />
        </div>
    )

}