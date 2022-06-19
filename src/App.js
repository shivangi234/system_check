import React from "react";
import { Routes, Route } from "react-router-dom";
import SystemCheck from './SystemCheck'
import Check from "./Check";
import ExamTime from "./ExamTime";
import Demo from "./Demo";

const App = () => {
  return (
    <>
    {/* <Check/> */}
    {/* <ExamTime/> */}
      <Routes>
      <Route path="/" element={<Check />}></Route>
      <Route path="/system" element={<SystemCheck />}></Route>
        <Route path="/check" element={<Check />}></Route>
        <Route path="/exam" element={<ExamTime />}></Route>
        <Route path="/demo" element={<Demo />}></Route>
  

      </Routes>
    </>
  );
};
export default App;
