import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { pictureCache } from "./new-project-form";




export function ProjectFormFields({ form }: { form: UseFormReturn<{
    project: {
        name: string;
        picture: string;
        description: string;
    };
    collection?: {
        name: string;
        picture: string;
        description: string;
    };
    nfts?: {
        name: string;
        picture: string;
        description: string;
    }[] | undefined;
}, any, undefined> }) {
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
                name="project.picture"
                render={({ field }) => (
                    <FormItem className="w-96">
                        <FormLabel>Project Picture</FormLabel>
                        <FormControl>
                            <Input type="file" {...field} onChange={(e) => {field.onChange(e); (e.target.files ? pictureCache.project.picture = e.target.files[0] : [])}}/>
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
        </div>
    )
}

export function CollectionFormFields({ form }: { form: UseFormReturn<{
    project: {
        name: string;
        picture: string;
        description: string;
    };
    collection?: {
        name: string;
        picture: string;
        description: string;
    };
    nfts?: {
        name: string;
        picture: string;
        description: string;
    }[] | undefined;
}, any, undefined> }) {
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
                name="collection.picture"
                render={({ field }) => (
                    <FormItem className="w-96">
                        <FormLabel>Collection Picture</FormLabel>
                        <FormControl>
                            <Input type="file" {...field} onChange={(e) => {field.onChange(e); (e.target.files ? pictureCache.collection.picture = e.target.files[0] : [])}} />
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

export function NFTFormFields({ form, instance}: { form: UseFormReturn<{
    project: {
        name: string;
        picture: string;
        description: string;
    };
    collection?: {
        name: string;
        picture: string;
        description: string;
    };
    nfts?: {
        name: string;
        picture: string;
        description: string;
    }[] | undefined;
}, any, undefined>, instance:number }){
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
                name={`nfts.${instance}.picture`}
                render={({ field }) => (
                    <FormItem className="w-96">
                        <FormLabel>NFT Picture</FormLabel>
                        <FormControl>
                        <Input type="file" {...field} onChange={(e) => {field.onChange(e); (e.target.files ? pictureCache.nfts.push({picture: e.target.files[0]}) : [])}} />
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