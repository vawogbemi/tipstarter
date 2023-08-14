import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export default function Feed({ name }: { name: string | null }) {
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
                        .map(([key, value]) => (<Card className="w-[300px] md:w-[400px] lg:w-[500px]">
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