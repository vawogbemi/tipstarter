
"use client"

import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CollectionFormFields, NFTFormFields, ProjectFormFields } from "./new-project-form-fields"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { TipLink } from "@tiplink/api"


type Profiles = Database['public']['Tables']['profiles']['Row']

export var imageCache = {
    project: {
        image: new File([""], "")
    },
    collection: {
        image: new File([], ""),

    },
    nfts: [
        { image: new File([""], "") }
    ]

}



export default function ProjectForm() {

    const [rewards, setRewards] = useState(false)

    const router = useRouter()

    const supabase = createClientComponentClient<Database>({ supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! });

    const formSchema = z.object({
        project: z.object({
            name: z.string().min(2).max(50),
            image: z.string().min(2, "Required"),
            description: z.string().min(2).max(500),
            end_date: z.date(),
            project_goal: z.coerce.number().min(1),
        }),
        collection: z.object({
            name: rewards ? z.string().min(2).max(50) : z.string(),
            image: rewards ? z.string().min(2, "Required") : z.string(),
            description: rewards ? z.string().min(2).max(500) : z.string(),
        }).optional(),
        nfts: z.array(
            z.object({
                name: rewards ? z.string().min(2).max(50) : z.string(),
                price: rewards ? z.coerce.number() : z.coerce.number(), //not adding min for demo purposes
                image: rewards ? z.string().min(2, "Required") : z.string(),
                description: rewards ? z.string().min(2).max(500) : z.string(),
            })
        ).optional(),
    })

    type projectFormValues = z.infer<typeof formSchema>

    const form = useForm<projectFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            project: {
                name: "",
                image: "",
                description: "",
                end_date: new Date(Date.now()),
                project_goal: 0.00,
            },
            collection: {
                name: "",
                image: "",
                description: "",
            },
            nfts: [
                {
                    name: "",
                    price: 1.00,
                    image: "",
                    description: "",
                }
            ]
        }
    })


    const [nfts, setNfts] = useState([1])

    async function onSubmit(values: projectFormValues) {
        imageCache.nfts.shift()

        const user = (await supabase.auth.getUser()).data.user

        const projectImageExt = imageCache.project.image.name.split('.').pop()
        const projectImagePath = `${values.project.name}-${user?.id}.${projectImageExt}`

        let { error: projectImageError } = await supabase.storage.from('projects').upload(projectImagePath, imageCache.project.image)

        //const tiplink = await TipLink.create()

        let { data: projectData, error: projectError } = await supabase.from('projects').insert(
            {
                creator_id: user?.id,
                project_name: values.project.name,
                project_image: projectImagePath,
                project_description: values.project.description,
                end_date: values.project.end_date.toISOString(),
                project_goal: values.project.project_goal,
                //project_tiplink: tiplink.url.toString(),
                creator_image: user?.user_metadata.avatar_url,
                creator_name: user?.user_metadata.name,
            }
        ).select()
        
        const pd = projectData?.at(0)

        if (rewards) {

            const collectionImageExt = imageCache.collection.image.name.split('.').pop()
            const collectionImagePath = `${values.collection?.name}-${pd?.id}.${collectionImageExt}`

            let { error: collectionImageError } = await supabase.storage.from('nft_collections').upload(collectionImagePath, imageCache.collection.image)

            let { data: collectionData, error: collectionError } = await supabase.from('nft_collections').insert(
                {
                    project_id: pd?.id,
                    collection_name: values.collection?.name,
                    collection_image: collectionImagePath,
                    collection_description: values.collection?.description,
                }
            ).select()
            
            const cd = collectionData?.at(0)
            console.log(imageCache.nfts)
            values.nfts?.forEach(async (nft) => {

                const nftImage = imageCache.nfts.shift()
                const nftImageExt = nftImage?.image.name.split('.').pop()
                const nftImagePath = `${nft.name}-${cd?.id}.${nftImageExt}`

                let { error: nftImageError } = await supabase.storage.from('nfts').upload(nftImagePath, nftImage!.image)
                let { error: nftError } =
                    await supabase.from('nfts').insert(
                        {
                            project_id: pd?.id,
                            collection_id: cd?.id,
                            nft_name: nft.name,
                            nft_price: nft.price,
                            nft_image: nftImagePath,
                            nft_description: nft.description,
                        }
                    )
            });

            //CREATE CREATORS TIPLINK
        }



        //console.log(projectError)
        //let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
        //router.push("/")
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-10 mx-36">
                <ProjectFormFields form={form} />
                {rewards &&
                    (
                        <div>
                            <CollectionFormFields form={form} />

                            {Object.entries(nfts)
                                .map(
                                    ([key]) => (<NFTFormFields key={key} form={form} instance={Number(key)} />)
                                )

                            }
                        </div>
                    )
                }

                <div className="flex">
                    <div>
                        {rewards &&
                            <div>
                                <Button type="button" className="mr-2" onClick={() => { setNfts(currNfts => ([...currNfts, nfts.length + 1])) }}>Add NFT</Button>
                                <Button type="button" onClick={() => {if (nfts.length > 1){setNfts(nfts.slice(0, -1))}}}>Remove NFT</Button>
                                {/*<Button type="button" onClick={() => nfts.length == 0 ? console.log("PickMe") : console.log(nfts)}>Click me</Button>*/}
                            </div>
                        }
                    </div>
                    <div className="ml-auto">
                        <Button className={rewards ? "mr-5 bg-red-500" : "mr-5 bg-green-500"} type="button" onClick={() => { setRewards(!rewards) }}>{rewards ? "Remove Rewards" : "Add Rewards"}</Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
            </form>
        </Form>
    )

}