import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useState } from "react";
import EditWorkout from "./EditWorkout";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext();
    const [isEdit, setIsEdit] = useState(false)

    const handleDelete = async () => {

        if(!user){
            return
        }

        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const data = await response.json()

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: data })
        }
    }

    const toggleEditButton = () => {
        setIsEdit(!isEdit);
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined delete" onClick={handleDelete}>delete </span>
            <span className="material-symbols-outlined edit" onClick={toggleEditButton}>edit</span>
            {isEdit && <EditWorkout workout={workout} setIsEdit={setIsEdit}/>}

        </div>
    )
}

export default WorkoutDetails