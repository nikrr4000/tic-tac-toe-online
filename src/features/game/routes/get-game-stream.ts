import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest, NextResponse } from "next/server";

export function getGameStream(req: NextRequest) {
    const {
        addCloseListener, 
        write, 
        response
    } = sseStream(req)

    let i = 0
    const interval = setInterval(()=>{
        write(i++)
    }, 1000)

    addCloseListener(()=>{
        clearInterval(interval)
    })

    return response
}