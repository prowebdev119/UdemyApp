import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminPage from "./page/admin";
import DashbordPage from "./page/dashbord";
function App() {
  const [CourseDate, setCourseDate] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/courses/data.json")
      .then((date) => date.json())
      .then((data) => setCourseDate(data));
  }, []);

  if (CourseDate === []) return <></>;
  else
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminPage data={CourseDate}/>} />
            <Route path="/course/:id" element={<DashbordPage data={CourseDate}/>} />
          </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;
