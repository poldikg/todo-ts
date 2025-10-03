import React, { useState } from "react";
import { lastDayOfISOWeek, lightFormat } from "date-fns";

//Styling
import "./Inputs.css";

//Types
import type { JSX } from "react";

//Hooks
import { useContext } from "react";
import { TasksContext } from "../TasksContext/TasksContext";
import useTaskContext from "../../Hooks/useTaskContext";

type InputsProps = {
  updateCount: (newCount: number) => void;
  name: string;
};

type WeekDaysNames = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type Weekdays =
  | { day: "Monday"; checked: boolean }
  | { day: "Tuesday"; checked: boolean }
  | { day: "Wednseday"; checked: boolean }
  | { day: "Thursday"; checked: boolean }
  | { day: "Friday"; checked: boolean };

export type UserData = {
  _id?: string;
  days: WeekDaysNames[];
  task: string[] | string;
  date: string;
  week?: number;
};

const Inputs = (props: InputsProps): JSX.Element => {
  const { state, dispatch } = useTaskContext();
  const [checkboxCount, setCheckboxCount] = useState(0);
  const [weekDays, setWeekDays] = useState<Weekdays[]>([
    { day: "Monday", checked: false },
    { day: "Tuesday", checked: false },
    { day: "Wednseday", checked: false },
    { day: "Thursday", checked: false },
    { day: "Friday", checked: false },
  ]);
  const [formSubmissionFailed, setFormSumbmissionFailed] =
    useState<boolean>(false);
  console.log(weekDays);

  const currentDate = lightFormat(new Date(), "dd.MM.yyyy");
  const lastDateOfWeek = lightFormat(
    lastDayOfISOWeek(new Date()),
    "dd.MM.yyyy"
  );

  const currentWeek = currentDate + "-" + lastDateOfWeek;
  console.log(currentWeek);

  const renderTasks = [].map((t: UserData) => {
    return (
      <div>
        <p>{t.task}</p>
      </div>
    );
  });

  const renderWeekDays = weekDays.map((day, index) => {
    return (
      <div className="checkbox-container">
        <input
          type="checkbox"
          name="days"
          value={day.day}
          id={day.day}
          className="checkbox-days"
          disabled={index + 1 < new Date().getDay()}
          onClick={() => {
            toggleCheckbox(day.day);
          }}
        />
        <label htmlFor={day.day} className="checkbox-days-label">
          {day.day}
        </label>
      </div>
    );
  });

  const toggleCheckbox = (dayName: string): void => {
    setWeekDays((prevDays: Weekdays[]): Weekdays[] => {
      return prevDays.map((day: Weekdays) => {
        return day.day === dayName ? { ...day, checked: !day.checked } : day;
      });
    });
  };

  const isDayChecked = weekDays.some((day) => {
    return day.checked === true;
  });

  const handleForm = (formData: FormData): void => {
    if (isDayChecked) {
      //Gets the task as a string
      const taskWritten = formData.get("task") as string;

      //Gets the days from the checkboxes and sets them in an array
      const daysSelected = formData.getAll("days") as WeekDaysNames[];
      console.log(taskWritten, daysSelected, formData);
      const userInputData = {
        days: daysSelected,
        task: taskWritten,
        date: currentWeek,
        week: 1,
      };

      fetch("http://localhost:4000/api/tasks/", {
        method: "POST",
        body: JSON.stringify(userInputData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch({
            type: "ADD_TASK",
            payload: data,
          });
        });

      setWeekDays((prevDays: Weekdays[]): Weekdays[] => {
        return prevDays.map((day: Weekdays) => {
          return { ...day, checked: false };
        });
      });
      setFormSumbmissionFailed(false);
    } else if (!isDayChecked) {
      setFormSumbmissionFailed(true);
    }
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
      {!isDayChecked && formSubmissionFailed && (
        <div style={{ color: "red" }}>
          Please select at least one day for the task!
        </div>
      )}
      {renderTasks}
    </form>
  );
};

export default Inputs;
