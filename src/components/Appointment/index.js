import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

// custom hook
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {
  const { time, interview, interviewers } = props

  // when props.interview contains value, pass useVisualMode the SHOW mode, if it's empty pass EMPTY mode
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // create and cancel a new appointment
  const onAdd = () => transition(CREATE);
  const onCancel = () => back();

  // save operation that calls bookInterview and show SAVING indicator while calling
  const onSave = (name, interviewer) => {
    transition(SAVING, true);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview) 
    .then(() => transition(SHOW))
    .catch(err => console.log(err.message));
  };

  // delete operation that calls cancelInterview and show DELETING indicator while calling
  const onDelete = function() {
    transition(CONFIRM);
  }

  const onConfirm = function(name, interviewer) {
    transition(DELETING, true);

    const interview = {
      student: name,
      interviewer
    };

    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(err => console.log(err.message));
  }

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={onCancel}
          onConfirm={onConfirm}
          message = "Would you like to delete this appointment?"
        />)}
    </article>
  );
}