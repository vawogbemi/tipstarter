import Link from "next/link";
import AuthForm from "@/app/auth-form";
import { Session } from "@supabase/auth-helpers-nextjs";
import UserNav from "./user-nav";

export default function MainNav({ session }: { session: Session | null }) {

    return (
        <nav
            className="flex border-b font-helvetica w-auto"
        >
            <div className="flex h-10 py-10 p-4 items-center space-x-4 lg:space-x-6">
                <Link
                    href={"/"}
                    className="hover:bg-fuchsia-100 "
                >
                    <h1>TIPSTARTER</h1>
                </Link>
                {session ? <Link
                    href={"/my-projects"}

                >
                    <h1 className="hover:text-fuchsia-900 justify-self-end"> My Projects</h1>
                </Link> : <></>}

            </div>
            <div className="grid ml-auto pr-5">
                {session ? <UserNav session={session}/>:
                    <AuthForm />
                }
            </div>
        </nav>
    )
}