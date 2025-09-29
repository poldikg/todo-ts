import React from "react";
import { useState } from "react";
import Inputs from "../../Components/Inputs/Inputs";
import Day from "../../Components/Day/Day";
import type { JSX } from "react";

const MainPage = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);

  const updateCount = (newCount: number): void => {
    setCount((prevCount) => prevCount + newCount);
  };

  console.log(count);
  return (
    <div>
      <Inputs updateCount={updateCount} name="ivan" />
    </div>
  );
};

export default MainPage;
