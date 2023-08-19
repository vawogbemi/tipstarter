import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"



export default async function Feed({ name, project }: {
    name: string | null,
    project: {
        created_at: string;
        creator_id: string | null;
        end_date: string | null;
        id: number;
        project_description: string | null;
        project_funding: number;
        project_goal: number;
        project_image: string | null;
        project_name: string | null;
        project_num_supporters: number | null;
        project_tiplink: string | null;
        updated_at: string;
    }[] | null
}) {


    return (
        <div>
            <h1 className="text-3xl font-helvetica pl-5">{name}</h1>
            <div className="flex flex-wrap justify-around content-start gap-10 md:gap-10 lg:gap-10 mt-5">
                {
                    project?.map((key) => (
                        <Link href={`/project/${key.id}`}>
                            <Card className="w-[300px] md:w-[400px] lg:w-[500px]" key={key.id}>
                                <CardHeader>
                                    <CardTitle>{key.project_name}</CardTitle>
                                    <CardDescription>{key.project_description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src={`https://lprpwskeennxoukahtlc.supabase.co/storage/v1/object/public/projects/${key.project_image}`} alt="" />
                                </CardContent>
                                <CardFooter>{key.created_at}</CardFooter>
                            </Card>
                        </Link>))

                }
            </div>
        </div>
    )
}