import React, { useState } from "react";
import { lastDayOfISOWeek, lightFormat } from "date-fns";

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

type WeekDaysNames = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type Weekdays =
  | { day: "Monday"; checked: boolean }
  | { day: "Tuesday"; checked: boolean }
  | { day: "Wednseday"; checked: boolean }
  | { day: "Thursday"; checked: boolean }
  | { day: "Friday"; checked: boolean };

export type UserData = {
  id: string;
  days: WeekDaysNames[];
  tasks: string[] | string;
  date: string;
  week?: number;
};

const Inputs = (props: InputsProps): JSX.Element => {
  const { state, dispatch } = useContext(TasksContext);
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

  const renderTasks = state.map((t: UserData) => {
    return (
      <div>
        <p>{t.tasks}</p>
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
          date: currentWeek,
          week: 1,
        },
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
