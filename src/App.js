import React from "react";
import { Routes, Route } from "react-router-dom";
import SystemCheck from './SystemCheck'
import Check from "./Check";
import ExamTime from "./ExamTime";
import Demo from "./Demo";
import Demostep from "./Demostep";

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
        <Route path="/demop" element={<Demostep />}></Route>
  

      </Routes>
    </>
  );
};
export default App;
