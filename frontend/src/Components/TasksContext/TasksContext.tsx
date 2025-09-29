//Hooks
import { createContext, useReducer } from "react";

//Type
import type { UserData } from "../Inputs/Inputs";
import type { JSX } from "react";

type PayloadTypes =
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
    return (state = state.filter((task) => {
      task.id !== action.payload.id;
    }));
  } else {
    return state;
  }
};

export const TasksContext = createContext<any | null>(null);

const TasksContextProvider = ({ children }: any) => {
  const initialState: UserData[] = [
    {
      id: "12356asdg12",
      days: ["Monday", "Monday"],
      tasks: "asdasda",
      date: "29.09.2025",
      week: 1,
    },
  ];

  const [state, dispatch] = useReducer(tasksReducer, initialState);
  console.log(state);

  return <TasksContext value={{ state, dispatch }}>{children}</TasksContext>;
};

export default TasksContextProvider;
