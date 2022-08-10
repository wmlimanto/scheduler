import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

// custom hook
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment(props) {
  const { time, interview, interviewers } = props

  // when props.interview contains value, pass useVisualMode the SHOW mode, if it's empty pass EMPTY mode
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // save operation that calls bookInterview and show SAVING indicator while calling
  const save = (name, interviewer) => {
    transition(SAVING, true);

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props.bookInterview(props.id, interview) 
    .then(() => transition(SHOW))
    .catch(err => console.log(err.message));
  };

  const onAdd = () => transition(CREATE);
  const onCancel = () => back();

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}