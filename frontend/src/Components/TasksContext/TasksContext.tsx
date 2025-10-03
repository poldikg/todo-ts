//Hooks
import { createContext, useReducer, useEffect } from "react";
import type { Dispatch } from "react";

//Type
import type { UserData } from "../Inputs/Inputs";
import type { JSX } from "react";

export type PayloadTypes =
  | {
      type: "GET_TASKS";
      payload: UserData[];
    }
  | {
      type: "REMOVE_TASK";
      payload: UserData;
    }
  | {
      type: "ADD_TASK";
      payload: UserData;
    };

const tasksReducer = (state: UserData[], action: PayloadTypes): UserData[] => {
  if (action.type === "GET_TASKS") {
    return (state = action.payload);
  } else if (action.type === "ADD_TASK") {
    return [action.payload, ...state];
  } else if (action.type === "REMOVE_TASK") {
    return state.filter((task) => task._id !== action.payload._id);
  } else {
    return state;
  }
};

export const TasksContext = createContext<{
  state: UserData[];
  dispatch: Dispatch<PayloadTypes>;
} | null>(null);

const TasksContextProvider = ({ children }: any): JSX.Element => {
  const initialState: UserData[] = [
    {
      _id: "12356asdg12",
      days: ["Monday", "Monday"],
      task: "asdasda",
      date: "29.09.2025",
      week: 1,
    },
  ];

  useEffect(() => {
    fetch("http://localhost:4000/api/tasks/")
      .then((res) => res.json())
      .then((data: UserData[]) =>
        dispatch({ type: "GET_TASKS", payload: data })
      );

    console.log(state);
  }, []);

  const [state, dispatch] = useReducer(tasksReducer, initialState);
  console.log(state);

  return <TasksContext value={{ state, dispatch }}>{children}</TasksContext>;
};

export default TasksContextProvider;
