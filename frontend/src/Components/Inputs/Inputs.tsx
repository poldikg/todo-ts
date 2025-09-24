import React from "react";
import "./Inputs.css";

interface InputsProps {
  updateCount: (newCount: number) => void;
}

const Inputs: React.FC<InputsProps> = (props) => {
  const weekDays: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const renderWeekDays = weekDays.map((day) => {
    return (
      <div>
        <input type="checkbox" name="" id={day} />
        <label htmlFor={day}>{day}</label>
      </div>
    );
  });

  return (
    <form className="task-gathering">
      <div className="task-addition-input">
        <label htmlFor="task">Task</label>
        <input type="text" name="task" id="task" />
      </div>

      {renderWeekDays}
      <button
        type="button"
        onClick={() => {
          console.log("button clicked");
          props.updateCount(3);
        }}
      >
        Add task
      </button>
    </form>
  );
};

export default Inputs;
