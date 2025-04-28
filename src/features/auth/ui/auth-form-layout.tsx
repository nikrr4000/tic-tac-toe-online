import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shared/ui/card"

export function AuthFormLayout({
    title,
    description,
    fields,
    actions,
    link,
    error,
    action
}:{
    title: string,
    description: string,
    fields: React.ReactNode,
    actions: React.ReactNode,
    link: React.ReactNode,
    error: React.ReactNode,
    action: (formData: FormData) => void
}){
    return (
        <Card className="w-full max-w-md gap-10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold mb-10">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action} className="space-y-4">
                    {fields}
                    {error}
                    {actions}
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                {link}
            </CardFooter>
        </Card>
    )
}