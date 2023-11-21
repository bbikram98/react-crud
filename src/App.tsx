import "./App.css";
import EmployeeDashboard from "./components/dashboard";
import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import EmployeeAdd from "./components/add_edit";

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<EmployeeDashboard/>} />
        <Route path="/edit/:id" element={<EmployeeAdd/>} />
        <Route path="/add" element={<EmployeeAdd/>} />
      </Routes>
  );
};

export default App;
