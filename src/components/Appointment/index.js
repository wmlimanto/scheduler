import React, { Fragment } from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

// custom hook
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
  const { time, interview, interviewers } = props

  // when props.interview contains value, pass useVisualMode the SHOW mode, if it's empty pass EMPTY mode
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

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
        />
      )}
    </article>
  );
}