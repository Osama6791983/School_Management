import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import AddStudents from "./components/Students/AddStudent";
import ManageStudent from "./components/Students/ManageStudent";
import InfoDisplay from "./components/Dashboard/InfoDisplay";
import NewProgram from "./components/Programs/NewProgram";
import ProgramSummary from "./components/Programs/ProgramSummary";



function App() {
  return (
   <>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<InfoDisplay />} />
          <Route path="/students/addstudent" element={<AddStudents />}  />
          <Route path="/students/editstudent" element={<ManageStudent /> } />
          <Route path="/programs/addprogram" element={<NewProgram />} />

          <Route path="/programs/programsummary" element={<ProgramSummary />} />
          
          <Route path="*" />

       </Routes>
      
      
   </>
  );
}

export default App;
