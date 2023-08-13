import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { type ClassValue, clsx } from "clsx"
import { cookies } from "next/headers"
import { cache } from "react"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})
