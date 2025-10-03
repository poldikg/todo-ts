import type { JSX } from "react";
import { useContext, useEffect } from "react";
import { TasksContext } from "../../Components/TasksContext/TasksContext";

import type { UserData } from "../../Components/Inputs/Inputs";

//Hooks
import useTaskContext from "../../Hooks/useTaskContext";

const List = (): JSX.Element => {
  const { state } = useTaskContext();
  console.log(state);
  const renderTasks = state.map((t: UserData) => {
    return (
      <div>
        <p>{t.task}</p>
      </div>
    );
  });

  return (
    <main>
      List
      {renderTasks}
    </main>
  );
};

export default List;
