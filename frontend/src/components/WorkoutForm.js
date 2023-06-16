import { useState } from "react";
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {

    const { user } = useAuthContext()

    // 17. import useWorkoutContext, and now we can consume the custom useContext hook
    const {dispatch} = useWorkoutContext();
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!user){
            setError("You must be logged in")
            return
        }

        const newWorkout = {title, load, reps}
        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(newWorkout),
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const data = await response.json();

        if(!response.ok){
            setEmptyFields(data.emptyFields);
            setError(data.error);
        }else{
            setError(null);
            setLoad("");
            setReps("");
            setTitle("");
            setEmptyFields([]);
            console.log("new workout added", data);
            // 18. dispatch the type of state change along with the payload
            dispatch({type:"CREATE_WORKOUT", payload: data})

        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>
            <label>Exercise title:</label>
            {/* thats how you grab the input and change its state */}
            <input
                type="text"
                onChange={(e)=>setTitle(e.target.value)}
                value = {title}
                className={emptyFields.includes("title") ? "error" : ""}
            />
            <label>Load (kg):</label>
            <input
                type="number"
                onChange={(e)=>setLoad(e.target.value)}
                value = {load}
                className={emptyFields.includes("load") ? "error" : ""}
            />
            <label>Reps:</label>
            <input
                type="number"
                onChange={(e)=>setReps(e.target.value)}
                value = {reps}
                className={emptyFields.includes("reps") ? "error" : ""}
            />
            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm