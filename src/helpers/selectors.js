
// function receives two args state and day, should return an array of appointments for the given day
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(appt => appt.name === day);
  let appointments = [];

  if(selectedDay) {
    appointments = selectedDay.appointments.map((id) => state.appointments[id])
  }

  return appointments;
};

// function should return a new object containing the interview data when we pass it an object that contains the interviewer, else return null
export function getInterview(state, interview) {

  if(interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }

  return null;
};

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(x => x.name === day);
  let interviewers = [];

  if(selectedDay) {
    interviewers = selectedDay.interviewers.map(id => state.interviewers[id]);
  }
  
  return interviewers;
};
