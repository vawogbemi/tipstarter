import { createServerSupabaseClient } from '@/lib/supabaseUtils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import MainNav from '@/components/main-nav'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SpherePayForm from '@/components/sphere-pay';
import { Button } from '@/components/ui/button';
import DoomsDayButton from '@/app/endEvent/oppenheimer';


export default async function Page({ params }: { params: { id: string } }) {

    const supabase = createServerSupabaseClient()
    const supabaseServer = createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! });

    const {
        data: { session },
    } = await supabase.auth.getSession()

    let { data: projectData, error: projectError } = await supabaseServer.from("projects").select().eq("id", params.id)

    const pd = projectData?.at(0)

    const { data: projectImage } = await supabaseServer.storage.from("projects").getPublicUrl(projectData?.at(0)?.project_image!)

    let { data: collectionData, error: collectionError } = await supabaseServer.from("nft_collections").select().eq("project_id", params.id)

    const cd = collectionData?.at(0)

    let collectionImage

    cd ? { data: collectionImage } = await supabaseServer.storage.from("nft_collections").getPublicUrl(collectionData?.at(0)?.collection_image!) : null

    let nftData, nftError

    cd ? { data: nftData, error: nftError } = await supabaseServer.from("nfts").select().eq("project_id", params.id) : null

    return (
        <div>
            <div>
                <MainNav session={session} />
            </div>
            <div className='mx-20'>
                {(pd?.creator_id == session?.user.id) &&
                
                <div className='flex mt-5'>
                    <DoomsDayButton data={pd} />
                </div>
                }
                <Card className='flex flex-wrap mt-10 justify-start content-start'>
                    <CardContent className='mt-5 md:w-full lg:w-3/5'>
                        <img className='w-auto' src={projectImage.publicUrl} alt="" />
                    </CardContent>
                    <CardTitle className='w-full lg:w-1/5 ml-5 mt-5'>
                        <p className='text-3xl md:text-7xl'>{pd?.project_name}</p>
                        <p className='text-sm md:text-2xl mt-5'>Started {pd?.created_at?.slice(0, 10)}</p>
                        <p className='text-sm md:text-2xl mt-5'>Ends {pd?.end_date?.slice(0, 10)}</p>
                        <p className='text-sm md:text-2xl mt-5'>{pd?.project_num_supporters} supporters</p>
                    </CardTitle>
                    <CardFooter className='w-full'>
                        <p className='text-sm md:text-2xl mt-5'>{pd?.project_description}</p>
                    </CardFooter>
                </Card>
                <div className='flex mt-2'>
                    <SpherePayForm session={session} data={pd} />
                    <p className='mt-10 ml-auto text-3xl font-helvetica'> {pd?.project_funding}/{pd?.project_goal} sol</p>
                </div>
                <Progress className='my-5' value={(pd?.project_funding! / pd?.project_goal!) * 100} />
                {cd &&
                    <div className=''>
                        <div className='flex flex-wrap '>
                            <div className='flex border w-full lg:w-2/5 border-black '>
                                <p className='text-3xl [writing-mode:vertical-rl] pt-10 border'>{cd.collection_name} Collection</p>
                                <img className="py-5 pl-4 pr-5 w-11/12" src={collectionImage!.publicUrl} />
                            </div>
                            <Accordion type='single' className='ml-2 w-full mt-5 lg:w-7/12'>
                                <ScrollArea className='w-full'>
                                    {
                                        nftData?.map(
                                            key => (
                                                <AccordionItem key={key.id} value={key.id.toString()} className='w-full'>
                                                    <AccordionTrigger>{key.nft_name}</AccordionTrigger>
                                                    <AccordionContent className=''>
                                                        <div className='flex flex-wrap'>
                                                            <div className='w-3/5'>
                                                                <p className='mt-5'>price: {key.nft_price}</p>
                                                                <p className='mt-5'>description: {key.nft_description}</p>
                                                            </div>
                                                            <img className="ml-10 w-1/5 max-h-40 justify-self-end" src={`https://lprpwskeennxoukahtlc.supabase.co/storage/v1/object/public/nfts/${key.nft_image}`} alt="" width={"auto"} height={"100px"} />
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )
                                        )
                                    }
                                </ScrollArea>

                            </Accordion>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}