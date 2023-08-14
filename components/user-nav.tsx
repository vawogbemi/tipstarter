
import { Session } from "@supabase/auth-helpers-nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "./ui/avatar";


export default function UserNav({ session }: { session: Session | null }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative mt-5 h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-black">
                        <AvatarImage src={session?.user.user_metadata.avatar_url} alt="avatar" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1 mr-5">
                        <p className="text-sm font-medium leading-none">{session?.user.user_metadata.full_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session?.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Account
                    </DropdownMenuItem>
                    <form action="/auth/signout" method="post">
                        <button className="w-full block" type="submit" >
                            <DropdownMenuItem className="">
                                Log out
                            </DropdownMenuItem>
                        </button>
                    </form>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}