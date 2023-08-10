import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { TipLink } from '@tiplink/api'
import AuthForm from './auth-form'

export default function Home() {

  const getPublicKeyString = async (link_string:string) => {
    const tiplink = await TipLink.fromLink(link_string);
    return tiplink.keypair.publicKey.toBase58();
  };
  
  const tp = "https://tiplink.io/i#238AKcwZdwit8vDmR"

  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">Supabase Auth + Storage</h1>
        <p className="">
          Experience our Auth and Storage through a simple profile management example. Create a user
          profile and upload an avatar image. Fast, simple, secure.
        </p>
      </div>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  )
}
