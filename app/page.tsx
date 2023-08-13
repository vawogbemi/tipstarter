import MainNav from '@/components/main-nav'
import { TipLink } from '@tiplink/api'
import AuthForm from './auth-form'
import Feed from '@/components/feed'
import { Button } from '@/components/ui/button';
import { createServerSupabaseClient } from '@/lib/utils';



export default async function Home() {

  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log(session?.user.user_metadata)

  const getPublicKeyString = async (link_string: string) => {
    const tiplink = await TipLink.fromLink(link_string);
    return tiplink.keypair.publicKey.toBase58();
  };

  const tp = "https://tiplink.io/i#238AKcwZdwit8vDmR"


  return (
    <div className="row">
        <div className="w-100">
          <MainNav session={session}/>
        </div>
      <div className='mt-5'>
        <Feed />
      </div>
    </div>
  )
}
