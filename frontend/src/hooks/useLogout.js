import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
    const { dispatch } = useAuthContext()

    // to logout a user, we dont need to send any request to the server
    // just update the global state of user to null and remove the token from storage
    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({type: "LOGOUT"})
    }

    return {logout};
}

export default useLogout