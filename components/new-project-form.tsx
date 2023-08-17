
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
type Profiles = Database['public']['Tables']['profiles']['Row']

export var pictureCache = {
    project: {
        picture: Blob
    },
    collection: {
        picture: Blob,

    },
    nfts: [
        { picture: Blob }
    ]

}

export default function ProjectForm() {

    const [rewards, setRewards] = useState(false)

    const router = useRouter()

    const supabase = createClientComponentClient<Database>()

    const formSchema = z.object({
        project: z.object({
            name: z.string().min(2).max(50),
            picture: z.string(),
            description: z.string().min(2).max(500),
        }),
        collection: z.object({
            name: rewards ? z.string().min(2).max(50) : z.string(),
            picture: z.string(),
            description: rewards ? z.string().min(2).max(500) : z.string(),
        }).optional(),
        nfts: z.array(
            z.object({
                name: rewards ? z.string().min(2).max(50) : z.string(),
                price: rewards ? z.coerce.number() : z.coerce.number(), //not adding min for demo purposes
                picture: z.string(),
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
                picture: undefined,
                description: "",
            },
            collection: {
                name: "",
                picture: undefined,
                description: "",
            },
            nfts: [
                {
                    name: "",
                    picture: "",
                    description: "",
                }
            ]
        }
    })

   


    async function onSubmit(values: projectFormValues) {
        console.log(values)
        pictureCache.nfts.shift()
        console.log(pictureCache)

        //let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
        //router.push("/")
    }


    const [nfts, setNfts] = useState([1])

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
                                <Button type="button" onClick={() => setNfts(nfts.slice(0, -1))}>Remove NFT</Button>
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