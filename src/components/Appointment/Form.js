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
    setError("");
  };

  const cancel = function() {
    reset();
    props.onCancel();
  };

  // function to validate if student or interviewer is not filled in or selected
  const validate = function() {
    if (student === "") {
      setError("Please fill in student name");
      return;
    }
    if (interviewer === null) {
      setError("Please select interviewer");
      return;
    }
    setError(null);
      props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
       <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
       <section className="appointment__actions">
         <Button danger onClick={cancel}>Cancel</Button>
         <Button confirm onClick={validate}>Save</Button>
       </section>
      </section>
    </main>
  );
}