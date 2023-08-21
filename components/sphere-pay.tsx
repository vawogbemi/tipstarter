"use client"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Session } from "@supabase/auth-helpers-nextjs";

export default function SpherePayForm({ data, session }: {
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
    } | undefined, session: Session | null
}) {

    const formSchema = z.object({
        amount: z.coerce.number().min(0)
    })

    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0
        }
    })


    async function onSubmit(values: FormValues) {

        if (session == null){
            alert("please login")
            return
        }

        const spherePriceOptions = {
            method: 'POST',
            body: JSON.stringify({ name: session.user.user_metadata.email, product: data?.sphere_product_id, unitAmount: values.amount * 1000000 })
        };


        const price = await (await fetch("/sphere/createPrice", spherePriceOptions)).json()

        console.log(price)


        const spherePaymentLinkOptions = {
            method: 'POST',
            body: JSON.stringify({ lineItems: [{ price: price.data.price.id, quantity: 1 }], successUrl: `https://tipstarter.vercel.app/payment/${data!.id}/${price.id}` })
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