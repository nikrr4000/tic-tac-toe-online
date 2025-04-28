import Link from "next/link"


export function BottomLink({
    text,
    linkText,
    url
}:{
    text: string,
    linkText: string
    url: string,
}){
    return (
        <div className="text-center text-primary/50">
            {text}{" "}
            <Link href={url} className="font-medium text-primary underline underline-offset-4">
                {linkText}
            </Link>
        </div>
    )
}