import React from "react";
import { useState } from "react";
import Inputs from "../../Components/Inputs/Inputs";
import Day from "../../Components/Day/Day";

const MainPage = () => {
  type Weekdays = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  type UserData = {
    days: Weekdays[];
    tasks: string[];
    date: string;
    week?: number;
  };
  const [data, setData] = useState<UserData>();

  const [count, setCount] = useState<number>(0);

  const updateCount = (newCount: number): void => {
    setCount((prevCount) => prevCount + newCount);
  };

  console.log(count);
  return (
    <div>
      <Inputs updateCount={updateCount} name="ivan" />
      <p>
        {data ? data.days[0] : ""} {data ? data.tasks[0] : ""}
      </p>
    </div>
  );
};

export default MainPage;
