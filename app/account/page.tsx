import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import AccountForm from './account-form'
import { cache } from 'react'
import MainNav from '@/components/main-nav'
import { createServerSupabaseClient } from '@/lib/utils'


export default async function Account() {
  const supabase = createServerSupabaseClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
        <div className='w-100'>
            <MainNav session={session}></MainNav>
        </div>
        <div className='mt-5'>
            <AccountForm session={session} />
        </div>
    </div>
  )
  
}