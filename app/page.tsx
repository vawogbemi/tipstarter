import MainNav from '@/components/main-nav'
import { TipLink } from '@tiplink/api'
import AuthForm from './auth-form'
import Feed from '@/components/feed'
import { Button } from '@/components/ui/button';
import { createServerSupabaseClient } from '@/lib/supabaseUtils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'


export default async function Home() {

  const supabase = createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! });
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  //console.log(session?.user.user_metadata)

  const getPublicKeyString = async (link_string: string) => {
    const tiplink = await TipLink.fromLink(link_string);
    return tiplink.keypair.publicKey.toBase58();
  };

  const tp = "https://tiplink.io/i#238AKcwZdwit8vDmR"

  let { data } = await supabase.from("projects").select()

  const props = {name:"My Projects"}
  return (
    <div>
        <div>
          <MainNav session={session}/>
        </div>
      <div className='mt-5'>
        <Feed name={"Feed"} data={data} />
      </div>
    </div>
  )
}
