import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from 'axios';

const InfoDisplay = () => {
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalDept, setTotalDept] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countStudentResponse = await axios.get('http://localhost:5000/api/users/count-student');
        const countDeptResponse = await axios.get('http://localhost:5000/api/users/count-dept');

        setTotalStudent(countStudentResponse.data.total); // Adjust as needed based on your API response structure
        setTotalDept(countDeptResponse.data.t_classes); // Adjust as needed based on your API response structure
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <Dashboard />
        </div>
        <div>
          <div className="p-10 flex justify-center">
            <div className="shadow-md py-5 px-16 mr-8">
              <h1 className="text-xl font-semibold">Total Classes</h1>
              <p className="text-3xl font-bold">{totalDept}</p>
              <p className="text-sm text-gray-500">View Class List</p>
            </div>
            <div className="shadow-md py-5 px-16">
              <h1 className="text-xl font-semibold">Total Students</h1>
              <p className="text-3xl font-bold">{totalStudent}</p>
              <p className="text-sm text-gray-500">View Students List</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoDisplay;
