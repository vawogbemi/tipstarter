"use client"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { redirect, useRouter } from "next/navigation"
import { createPaymentLink, createPrice, getProduct } from "@/lib/spherePayUtils";
import { useEffect } from "react";

export default function SpherePayForm({ data }: {
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
        project_tiplink: string | null;
        sphere_product_id: string | null;
        updated_at: string;
    } | undefined
}) {

    const formSchema = z.object({
        amount: z.coerce.number().min(100)
    })

    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0
        }
    })
    const router = useRouter()


    async function onSubmit(values: FormValues) {


        const spherePriceOptions = {
            method: 'POST',
            body: JSON.stringify({ product: data?.sphere_product_id, unitAmount: values.amount * 100000 })
        };


        const price = await (await fetch("/sphere/createPrice", spherePriceOptions)).json()

        const spherePaymentLinkOptions = {
            method: 'POST',
            body: JSON.stringify({lineItems: [{ price: price.data.price.id, quantity: 1 }]})
        };

        const paymentLink = await (await fetch("/sphere/createPaymentLink", spherePaymentLinkOptions)).json()

        window.location.replace(paymentLink.data.paymentLink.url)


    }


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Project Image</FormLabel>
                                <FormControl>
                                    <Input {...field} className="" />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='bg-blue-600 hover:bg-blue-800 mt-8' type="submit">
                        <img src='https://files.readme.io/0d0bb3d-small-favicon.png' width={50}></img>
                    </Button>
                </form>
            </Form>
        </div>
    )
}