import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutDispatch } = useWorkoutContext()

    // to logout a user, we dont need to send any request to the server
    // just update the global state of user to null and remove the token from storage
    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({type: "LOGOUT"})

        // update the global context of workouts to null whenever we log out, this prevents the worksout of previous user flashing when a new user logs in 
        workoutDispatch({ type: "SET_WORKOUTS", payload: null })
    }

    return {logout};
}

export default useLogout