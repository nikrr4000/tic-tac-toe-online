import { Input } from "@/shared/ui/input"
import { Label } from "@radix-ui/react-label"
import { useId } from "react"

export function AuthFields({
    formData, 
    errors
}: {
    formData?: FormData,
    errors?: {
        login?:string,
        password?: string
    }
}){
    const loginId = useId()
    const passwordId = useId()

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor={loginId}>Email</Label>
                <Input
                    id={loginId}
                    type="login"
                    name="login"
                    placeholder="enter your login"
                    required
                    defaultValue={formData?.get('login')?.toString()}
                />
                {errors?.login && <div>{errors.login}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor={passwordId}>Password</Label>
                <Input
                    id={passwordId}
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    required
                    defaultValue={formData?.get('password')?.toString()}
                />
                {errors?.password && <div>{errors.password}</div>}
            </div>
        </>
    )
}