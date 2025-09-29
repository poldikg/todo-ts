import type { JSX } from "react";
import { useContext, useEffect } from "react";
import { TasksContext } from "../../Components/TasksContext/TasksContext";

import type { UserData } from "../../Components/Inputs/Inputs";

const List = (): JSX.Element => {
  const { state } = useContext(TasksContext);
  console.log(state);
  const renderTasks = state.map((t: UserData) => {
    return (
      <div>
        <p>{t.tasks}</p>
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
