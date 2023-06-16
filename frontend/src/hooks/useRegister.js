import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const register = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (!response.ok) {
            setIsLoading(false);
            console.log(data)
            setError(data.error)
        }
        if(response.ok) {
            // save the user's token to localStorage
            localStorage.setItem("user", JSON.stringify(data))

            // update the AuthContext
            dispatch({ type: "LOGIN", payload: data })

            setIsLoading(false);

        }
    }
    return { register, error, isLoading}
}

export default useRegister