import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/users/login", {
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
    return { login, error, isLoading}
}

export default useLogin

// at this point of time when the user logs in, we have the user stored in localStorage, and the global authContext has the state of the user in it,
// but when the user refreshes the page, that global context becomes null, which makes react think that the user is logged out, even tho token is still there

// to solve this we can look into the localStorage for the user and if it is there, we can update the global authContext, so that react knows that the user is logged in