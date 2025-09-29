import React, { useState } from "react";

//Styling
import "./Inputs.css";

//Types
import type { JSX } from "react";

//Hooks
import { useContext } from "react";
import { TasksContext } from "../TasksContext/TasksContext";

type InputsProps = {
  updateCount: (newCount: number) => void;
  name: string;
};

type Weekdays = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export type UserData = {
  id: string;
  days: Weekdays[];
  tasks: string[] | string;
  date: string;
  week?: number;
};

const Inputs = (props: InputsProps): JSX.Element => {
  const { state, dispatch } = useContext(TasksContext);
  const [checkboxCount, setCheckboxCount] = useState(0);

  const weekDays: Weekdays[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const renderTasks = state.map((t: UserData) => {
    return (
      <div>
        <p>{t.tasks}</p>
      </div>
    );
  });

  const renderWeekDays = weekDays.map((day) => {
    return (
      <div className="checkbox-container">
        <input
          type="checkbox"
          name="days"
          value={day}
          id={day}
          className="checkbox-days"
          required={checkboxCount <= 0}
          onClick={() => {
            setCheckboxCount((prevCount) => prevCount + 1);
          }}
        />
        <label htmlFor={day} className="checkbox-days-label">
          {day}
        </label>
      </div>
    );
  });

  const handleForm = (formData: FormData): void => {
    //Gets the task as a string
    const task = formData.get("task");

    //Gets the days from the checkboxes and sets them in an array
    const days = formData.getAll("days");
    console.log(task, days, formData);
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: "12356asdg12",
        days: days,
        tasks: task,
        date: "29.09.2025",
        week: 1,
      },
    });
  };

  return (
    <form className="task-gathering" action={handleForm}>
      <div className="task-addition-input">
        <label htmlFor="task" className="task-label">
          Task
        </label>
        <textarea
          name="task"
          id="task"
          placeholder="Write your task!"
        ></textarea>
      </div>

      <div>{renderWeekDays}</div>
      <button type="submit" className="btn-add-task">
        Add task
      </button>

      {renderTasks}
    </form>
  );
};

export default Inputs;
