import MainNav from '@/components/main-nav'
import { TipLink } from '@tiplink/api'
import Feed from '@/components/feed'
import { Button } from '@/components/ui/button';
import { createServerSupabaseClient } from '@/lib/supabaseUtils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'


export default async function Home() {



  const supabase = createServerSupabaseClient()
  const supabaseServer = createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! });

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const getPublicKeyString = async (link_string: string) => {
    const tiplink = await TipLink.fromLink(link_string);
    return tiplink.keypair.publicKey.toBase58();
  };

  const tp = "https://tiplink.io/i#238AKcwZdwit8vDmR"

  let { data } = await supabaseServer.from("projects").select()

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    },
    body: JSON.stringify({ name: "name", description: "description", images: [] })
  };

  await fetch('https://api.spherepay.co/v1/product', options)
    .then(response => response.json())

  return (
    <div>
      <div>
        <MainNav session={session} />
      </div>
      <div className='mt-5'>
        {session ?

          <></> : 
          <div className='flex flex-wrap'>
          <p className='md:text-8xl ml-3 text-helvetica'> Raise crypto funds for your project, no wallet needed </p> 
          <p className='md:text-8xl text-right my-5 mr-3 text-helvetica'>Get Nfts for supporting your favourite projects</p>
          </div>

          }
        <Feed name={"Feed"} project={data} />
      </div>
    </div>
  )
}
