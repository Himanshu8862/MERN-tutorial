import React, { useState } from 'react'
// import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const EditWorkout = ({workout, setIsEdit}) => {
    const [title, setTitle] = useState(workout.title);
    const [load, setLoad] = useState(workout.load);
    const [reps, setReps] = useState(workout.reps);
    const [error, setError] = useState(null);

    const { user } = useAuthContext()
    const {dispatch} = useWorkoutContext();


    const handleUpdate = async(e) => {
        e.preventDefault();
        if(!user){
            setError("You must be logged in")
            return
        }

        const newWorkout = {title, load, reps}
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: "PATCH",
            body: JSON.stringify(newWorkout),
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const data = await response.json();

        if(!response.ok){
            setError(data.error);
        }else{
            setError(null);
            setIsEdit(false);
            console.log("new workout Updated", data);
            dispatch({type:"UPDATE_WORKOUT", payload: data})
        }
    }

    return (
        <>
            <form className="create" onSubmit={handleUpdate}>
                <h3>Update workout</h3>
                <label>Exercise title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="title"
                />
                <label>Load (kg):</label>
                <input
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    className="load"
                />
                <label>Reps:</label>
                <input
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    className="reps"
                />
                <button>Update</button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
    )
}

export default EditWorkout