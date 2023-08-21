"use client"

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function DoomsDayButton({ data }: {
    data: {
        created_at: string;
        creator_id: string | null;
        creator_image: string | null;
        creator_name: string | null;
        end_date: string | null;
        id: number;
        project_description: string | null;
        project_funding: number;
        project_goal: number;
        project_image: string | null;
        project_name: string | null;
        project_num_supporters: number | null;
        sphere_product_id: string | null;
        updated_at: string;
    } | undefined
}) {

    const form = useForm()

    async function onSubmit() {
        
        const iAmBecomeDeath = {
            method: 'POST',
            body: JSON.stringify({ projectId: data?.id, productId: data?.sphere_product_id })
        };


        const theEnd = await (await fetch("/endEvent", iAmBecomeDeath)).json()

        console.log(theEnd)

    }

    return (
        <div className='ml-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <Button className="bg-red-500"> End Project </Button>
                </form>
            </Form>
        </div>
    )
}