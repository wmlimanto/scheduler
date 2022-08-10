import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // updates the state with the new day
  const setDay = day => setState(Object.assign({}, state, {day}));
  // const setDays = (days) => setState(prev => (Object.assign({}, prev, {days})));
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ 
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });
  })

  // allows us to change the local state when we book an interview & update database with interview data
  const bookInterview = (id, interview) => {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment};

    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, {interview})
        .then(() => {
          setState({...state, appointments});
          resolve();
        }).catch(err => {
          console.log(err.message);
          reject();
        });
    });
  };

  // use appointment id to find appointment and set it's interview data to null
  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment};

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          setState({...state, appointments});
          resolve();
        }).catch(err => {
          console.log(err.message);
          reject();
        });
    });
  };
  
  return { state, setDay, bookInterview, cancelInterview };
  
}