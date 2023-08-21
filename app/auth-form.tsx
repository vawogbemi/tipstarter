'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../types/supabase'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>({supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!});
  return (
    <Auth
      supabaseClient={supabase}
      onlyThirdPartyProviders={true}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={['google']}
      redirectTo="https://tipstarter.vercel.app/auth/callback"
    />
  )
}