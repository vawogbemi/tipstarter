import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import AccountForm from './account-form'
import { cache } from 'react'

const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies()
    return createServerComponentClient({ cookies: () => cookieStore })
})

export default async function Account() {
  const supabase = createServerSupabaseClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <AccountForm session={session} />
}