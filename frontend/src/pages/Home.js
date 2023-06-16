import React, { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'


const Home = () => {
    // 14. import useWorkoutContext, and now we can consume the custom useContext hook to update the global context instead of useState to update the local state
    const {workouts, dispatch} = useWorkoutContext()

    // useAuthContext to grab the logged in user and send it in the req header
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const data = await response.json()

            if (response.ok) {
                // 15. use to dispatch function to update the context using the type of state change along with the payload
                dispatch({type:"SET_WORKOUTS", payload: data})
            }
        }

        if(user){
            fetchWorkouts();
        }

        // 16. in the dependency array, add dispatch to re-render everytime the dispatch function is changed
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;