//Hooks
import { useState } from "react";

//Components
import MainPage from "./Pages/MainPage/MainPage";
import Navbar from "./Components/Navigation/Navbar";
import List from "./Pages/List/List";
import { Routes, Route, useLocation } from "react-router";

//Style
import "./App.css";

function App() {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <Navbar />
      {location.pathname === "/" && <MainPage />}

      <Routes>
        <Route path="/Tasks" element={<MainPage />} />
        <Route path="/List" element={<List />} />
      </Routes>
    </>
  );
}

export default App;
