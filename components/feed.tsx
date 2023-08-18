import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export default function Feed({ name, data }: {
    name: string | null, data: {
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
    const projects: Object = {
        "1": "one",
        "2": "two",
        "3": "three",
        "4": "one",
        "5": "two",
        "6": "three",
    }
    return (
        <div>
            <h1 className="text-3xl font-helvetica pl-5">{name}</h1>
            <div className="flex flex-wrap justify-around content-between gap-10 md:gap-10 lg:gap-10 mt-5">
                {
                    Object.entries(projects)
                        .map(([key, value]) => (<Card className="w-[300px] md:w-[400px] lg:w-[500px]" key={key}>
                            <CardHeader>
                                <CardTitle>{key}</CardTitle>
                                <CardDescription>{value}</CardDescription>
                            </CardHeader>
                            <CardFooter>{value}</CardFooter>
                        </Card>))
                }
            </div>
        </div>
    )
}