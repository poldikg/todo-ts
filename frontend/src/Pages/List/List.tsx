import type { JSX } from "react";
import { useContext, useEffect } from "react";
import { TasksContext } from "../../Components/TasksContext/TasksContext";
import "./List.css";

import type { UserData } from "../../Components/Inputs/Inputs";

//Hooks
import useTaskContext from "../../Hooks/useTaskContext";

const List = (): JSX.Element => {
  const { state, dispatch } = useTaskContext();
  console.log(state);

  const deleteTask = (task: UserData) => {
    fetch(`http://localhost:4000/api/tasks/${task._id}`, {
      method: "DELETE",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const renderTasks = state.map((t: UserData) => {
    return (
      <div className="list-task">
        <p>{t.task}</p>
        <button
          className="material-symbols-outlined btn-delete-task"
          onClick={() => {
            deleteTask(t);
            dispatch({ type: "REMOVE_TASK", payload: t });
          }}
        >
          delete
        </button>
      </div>
    );
  });

  return (
    <main className="list-main">
      <h2>Tasks</h2>
      {renderTasks}
    </main>
  );
};

export default List;
