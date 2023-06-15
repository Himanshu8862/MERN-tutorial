// import the WorkoutContext and useContext
import { WorkoutContext } from "../context/WorkoutContext"
import { useContext } from "react"

// 11. make a custom useContext hook to use the WorkoutContext object and return it
export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext)

  // 12. check that the context is only being used inside the alloewed component tree
  if(!context) {
    throw Error('useWorkoutContext must be used inside an WorkoutsContextProvider')
  }

  // 13. this is the object with state and dispatch function which will be consumed
  // go to Home.js 
  return context
}