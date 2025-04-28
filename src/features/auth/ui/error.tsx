import { Either, matchEither } from "@/shared/lib/either"
import { Alert, AlertDescription } from "@/shared/ui/alert"
import { error } from "console"
import { AlertCircle } from "lucide-react"
import React from "react"

export function ErrorMessage({error}:{error?: string}){
    if (error){
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
    return null
}