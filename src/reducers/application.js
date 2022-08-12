// action constants for switch cases
export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

export default function reducer(state, action) {

  switch(action.type) {

    // set state with new day value
    case SET_DAY:
      return {...state, day: action.value};

    // set state with data received from api
    case SET_APPLICATION_DATA:
      return {...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };

    // set state with new appointment data
    case SET_INTERVIEW:
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

      const days = state.days.map(day => day.name === selectedDay.name ? {...day, spots} : day);

      return {...state, appointments, days};
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );

  };
};
