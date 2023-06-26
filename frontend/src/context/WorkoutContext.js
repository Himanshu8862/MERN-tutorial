import { createContext, useReducer } from 'react'

// 1. a new context object for workouts. import createContext
export const WorkoutContext = createContext()


// 6. what's different here is the reducer function which works with dispatch to update the state of the variable "workouts"
// to update the state we need to call the dispatch function, and inside the dispatch function there is "type" property which describes in words what kind of state change we want to make.
// for example "SET_WORKOUTS" and 2nd property is a payload which is any data that is needed to make that change
// dispatch({type: "SET_WORKOUTS", payload:[{},{}]})
// so when the dispatch function is called, the reducer function is invoked, which get the action and does the state change

// 7. the reducer function takes in 2 arguments, first is the state which is the previous state before we make the change to it.
// second argument is the action, which is object (with type and payload property) that was passed into the dispatch function
export const workoutsReducer = (state, action) => {
  // 8. now depending on the action type we make changes to the state of "workout"
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        // all the data that was previously there and the new data that was created
        workouts: [action.payload, ...state.workouts]
      }
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((workout) => (
          workout._id !== action.payload._id
          ))
      }
    case "UPDATE_WORKOUT":
      return {
        workouts: state.workouts.map((workout) => {
          if(workout._id === action.payload._id){
            return{
                ...workout,
                title:action.payload.title,
                load:action.payload.load,
                reps:action.payload.reps,
            }
          }
          return workout;
        })
      }

    default:
      return state
  }
}

// 2. ContextProvider is a regular react component that will wrap other components which needs to have a context for the workout, the WorkoutContext
// in this case it is the <App /> component
export const WorkoutContextProvider = ({ children }) => {

  // 5. import useReducer. It will have a reducer function "workoutsReducer" and a initial value for the state which is an object with workouts property which is null to begin with.
  // useReducer is similar to useState as in it takes a state variable and a function "dispatch" to update that state value, and there is initial value of the state too.
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })

  // 3. template for the Provider without value={} atm
  // *4* is in index.js
  return (
    // 9. to make state and dispatch available in other components we pass them as value
    // now we just have to consume this state and dispatch function in other components using useContext hook,
    // but it is a good practice to make a custom hook for each context in this case "WorkoutContext"
    // make useWorkoutContext.js in hooks folder *10* is there
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {/* here children is the <App /> component */}
      {children}
    </WorkoutContext.Provider>
  )
}