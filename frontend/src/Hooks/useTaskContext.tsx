import { useContext } from "react";
import { TasksContext } from "../Components/TasksContext/TasksContext";

//Types
import type { UserData } from "../Components/Inputs/Inputs";
import type { Dispatch } from "react";
import type { PayloadTypes } from "../Components/TasksContext/TasksContext";

const useTaskContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error(
      "useTaskContext must be used within a TasksContextProvider"
    );
  }
  return context;
};

export default useTaskContext;
