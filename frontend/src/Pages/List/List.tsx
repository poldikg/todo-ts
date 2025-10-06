import type { JSX } from "react";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../Components/TasksContext/TasksContext";
import "./List.css";

import type { UserData } from "../../Components/Inputs/Inputs";

//Hooks
import useTaskContext from "../../Hooks/useTaskContext";

const List = (): JSX.Element => {
  const { state, dispatch } = useTaskContext();
  console.log(state);

  const filterMonday = state.filter((t: UserData): boolean => {
    return t.days.includes("Monday");
  });

  const filterTuesday = state.filter((t: UserData): boolean => {
    return t.days.includes("Tuesday");
  });

  const filterWednesday = state.filter((t: UserData): boolean => {
    return t.days.includes("Wednesday");
  });
  const filterThursday = state.filter((t: UserData): boolean => {
    return t.days.includes("Thursday");
  });
  const filterFriday = state.filter((t: UserData): boolean => {
    return t.days.includes("Friday");
  });

  const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const dailyTasks = [
    filterMonday,
    filterTuesday,
    filterWednesday,
    filterThursday,
    filterFriday,
  ];

  const deleteTask = (task: UserData) => {
    fetch(`http://localhost:4000/api/tasks/${task._id}`, {
      method: "DELETE",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const [updateTask, setUpdateTask] = useState<string>("");
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(
    undefined
  );

  const registerEdit = (event: any) => {
    setUpdateTask(event.target.innerText);
    console.log(event);
  };

  console.log(updateTask);
  const renderTasks = dailyTasks.map(
    (tasks: UserData[], index: number): JSX.Element => {
      return (
        <div className="daily-tasks">
          <h2 className="day-name">{WeekDays[index]}</h2>
          {tasks.map((t: UserData) => {
            const isActive = activeTaskId === t._id;
            return (
              <div className="list-task">
                <div>
                  <p
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onMouseLeave={registerEdit}
                    onClick={() => {
                      setActiveTaskId(t._id);
                    }}
                  >
                    {isActive ? updateTask : t.task}
                  </p>
                  {isActive && (
                    <div>
                      <button
                        onClick={() => {
                          dispatch({ type: "UPDATE_TASK", payload: t });
                          setActiveTaskId(undefined);
                          setUpdateTask(t.task);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          console.log(updateTask.length);
                          if (updateTask.length >= 2) {
                            dispatch({
                              type: "UPDATE_TASK",
                              payload: { ...t, task: updateTask },
                            });

                            fetch(`http://localhost:4000/api/tasks/${t._id}`, {
                              method: "PATCH",
                              body: JSON.stringify({ ...t, task: updateTask }),
                              headers: { "Content-Type": "application/json" },
                            });

                            setActiveTaskId(undefined);
                          }
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </div>
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
          })}
        </div>
      );
    }
  );

  return <main className="list-main">{renderTasks}</main>;
};

export default List;
