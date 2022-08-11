import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer?.id || null);
  const [error, setError] = useState("");

  const reset = function() {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = function() {
    reset();
    props.onCancel();
  };

  // save function now handles errors ie) if student or interviewer is not filled in or selected
  const save = function() {
    if (!student) {
      setError("Please fill in student name")
    } else if (!interviewer) {
      setError("Please select interviewer")
    } else {
      props.onSave(student, interviewer);
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        {error && (
          <div>
            {error}
          </div>
        )}
       <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
       <section className="appointment__actions">
         <Button danger onClick={cancel}>Cancel</Button>
         <Button confirm onClick={save}>Save</Button>
       </section>
      </section>
    </main>
  );
}