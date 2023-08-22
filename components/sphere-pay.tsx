"use client"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Session } from "@supabase/auth-helpers-nextjs";
import { TipLink } from "@tiplink/api";
import { SOL_CONSTANT } from "@/lib/spherePayUtils";

export default function SpherePayForm({ data, session}: {
    data: {
        created_at: string;
        creator_id: string;
        creator_image: string;
        creator_name: string;
        end_date: string | null;
        id: number;
        project_description: string;
        project_funding: number;
        project_goal: number;
        project_image: string;
        project_name: string;
        project_num_supporters: number;
        sphere_product_id: string;
        tiplink: string;
        updated_at: string;
    } | undefined, 
    session: Session | null,
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

        if (session == null) {
            alert("please login")
            return
        }

        const spherePriceOptions = {
            method: 'POST',
            body: JSON.stringify({ 
                name: session.user.user_metadata.email, 
                product: data?.sphere_product_id, unitAmountDecimal: values.amount 
             })
        };


        const price = await (await fetch("/sphere/createPrice", spherePriceOptions)).json()

        console.log(price)

        const sphereWalletOptions = {
            method: 'POST',
            body: JSON.stringify({ 
                address: (await TipLink.fromLink(data?.tiplink!)).keypair.publicKey.toString(), 
                })
        }

        const wallet = await( await fetch("/sphere/addWallet", sphereWalletOptions)).json()

        console.log(wallet)
        const spherePaymentLinkOptions = {
            method: 'POST',
            body: JSON.stringify({ 
                lineItems: [{ price: price.data.price.id, quantity: 1 }], 
                wallets: [{ id: wallet.data.wallet.id, shareBps: 10000 }], 
                successUrl: `https://tipstarter.vercel.app/payment/${data!.id}/${price.data.price.id}` })
        };

        const paymentLink = await (await fetch("/sphere/createPaymentLink", spherePaymentLinkOptions)).json()

        console.log(paymentLink)
        console.log(price.data.price.id)

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