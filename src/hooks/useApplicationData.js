import { useReducer, useEffect } from "react";
import { action } from "@storybook/addon-actions";
import axios from "axios";

export default function useApplicationData(props) {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch(action.type) {
      case SET_DAY:
        return ({...state, day: action.value});
      case SET_APPLICATION_DATA:
        return ({...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers
        });
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview,
        };

        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };

        const selectedDay = state.days.find((x) => x.appointments.includes(action.id))
        let spots = 0

        selectedDay.appointments.forEach((appointmentId) => {
          if (appointments[appointmentId].interview === null) {
            spots++
          }
        })

        const days = state.days.map((day) => day.name === selectedDay.name ? {...day, spots} : day);

        return {...state, appointments, days}
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        )
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
        dispatch({ 
          type: SET_APPLICATION_DATA,
          value: {
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data
          }
        });
      })
      .catch((error) => console.log(error.message));
  }, []);


  // updates the state with the new day
  const setDay = (day) => dispatch({type: SET_DAY, value: day});


  // allows us to change the local state when we book an interview & update database with interview data
  const bookInterview = (id, interview) => {

    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, { interview })
        .then(() => {
          dispatch({type: SET_INTERVIEW, id, interview});
          resolve();
        }).catch(err => {
          console.log(err.message);
          reject();
        });
    });
  };


  // use appointment id to find appointment and set it's interview data to null
  const cancelInterview = (id) => {

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          dispatch({type: SET_INTERVIEW, id, interview: null});
          resolve();
        }).catch(err => {
          console.log(err.message);
          reject();
        });
    });
  };
  
  return { state, setDay, bookInterview, cancelInterview };

}