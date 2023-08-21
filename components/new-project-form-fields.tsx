import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { imageCache } from "./new-project-form";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"


export function ProjectFormFields({ form }: {
    form: UseFormReturn<{
        project: {
            name: string;
            image: string;
            description: string;
            end_date: Date;
            project_goal: number;
        };
        collection?: {
            name: string;
            image: string;
            description: string;
        };
        nfts?: {
            name: string;
            image: string;
            description: string;
            price: number;
        }[] | undefined;
    }, any, undefined>
}) {
    return (
        <div className="space-y-8 my-10 w-4/5">
            <FormField
                control={form.control}
                name="project.name"
                render={({ field }) => (
                    <FormItem className="w-96">
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="project.image"
                render={({ field }) => (
                    <FormItem className="w-96">
                        <FormLabel>Project Image</FormLabel>
                        <FormControl>
                            <Input type="file" {...field} onChange={(e) => { field.onChange(e); (e.target.files ? imageCache.project.image = e.target.files[0] : []) }} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="project.description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="project.end_date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date < new Date() 
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormDescription>
                            Your date of birth is used to calculate your age.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="project.project_goal"
                render={({ field }) => (
                    <FormItem className="w-96">
                        <FormLabel>Project Goal</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export function CollectionFormFields({ form }: {
    form: UseFormReturn<{
        project: {
            name: string;
            image: string;
            description: string;
            end_date: Date;
            project_goal: number;
        };
        collection?: {
            name: string;
            image: string;
            description: string;
        };
        nfts?: {
            name: string;
            image: string;
            description: string;
            price: number;
        }[] | undefined;
    }, any, undefined>
}) {
    return (
        <div className="border-t space-y-8 my-10 w-4/5">
            <FormField
                control={form.control}
                name="collection.name"
                render={({ field }) => (
                    <FormItem className="w-96 mt-5">
                        <FormLabel>Collection Name</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="collection.image"
                render={({ field }) => (
                    <FormItem className="w-96">
                        <FormLabel>Collection Image</FormLabel>
                        <FormControl>
                            <Input type="file" {...field} onChange={(e) => { field.onChange(e); (e.target.files ? imageCache.collection.image = e.target.files[0] : []) }} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="collection.description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Collection Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export function NFTFormFields({ form, instance }: {
    form: UseFormReturn<{
        project: {
            name: string;
            image: string;
            description: string;
            end_date: Date;
            project_goal: number;
        };
        collection?: {
            name: string;
            image: string;
            description: string;
        };
        nfts?: {
            name: string;
            image: string;
            description: string;
            price: number;
        }[] | undefined;
    }, any, undefined>, instance: number
}) {
    return (
        <div className="border-t space-y-8 my-10 w-4/5">
            <FormField
                control={form.control}
                name={`nfts.${instance}.name`}
                render={({ field }) => (
                    <FormItem className="w-96 mt-5">
                        <FormLabel>NFT Name</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`nfts.${instance}.price`}
                render={({ field }) => (
                    <FormItem className="w-96">
                        <FormLabel>NFT Price</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`nfts.${instance}.image`}
                render={({ field }) => (
                    <FormItem className="w-96">
                        <FormLabel>NFT Image</FormLabel>
                        <FormControl>
                            <Input type="file" {...field} onChange={(e) => { field.onChange(e); (e.target.files ? imageCache.nfts.push({ image: e.target.files[0] }) : []) }} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`nfts.${instance}.description`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>NFT Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}