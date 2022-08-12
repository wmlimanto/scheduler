import { useReducer, useEffect } from "react";
import axios from "axios";

// import reducer
import reducer, {
  // eslint-disable-next-line
  SET_DAY,
  // eslint-disable-next-line
  SET_APPLICATION_DATA,
  // eslint-disable-next-line
  SET_INTERVIEW
} from 'reducers/application';

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

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
          console.log(err?.message ? err.message : err);
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
          console.log(err?.message ? err.message : err);
          reject();
        });
    });
  };
  
  return { state, setDay, bookInterview, cancelInterview };

}