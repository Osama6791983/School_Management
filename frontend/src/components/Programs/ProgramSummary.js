import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import axios from "axios";

const ProgramSummary = () => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/search-program/${selectedProgram}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setStudents(response.data.students);
      setCount(response.data.count);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No students found in this program");
      } else {
        setError("Error fetching data");
      }
      setStudents([]);
      setCount(0);
    }
  };

  return (
    <>
      <div className="flex">
        <div>
          <Dashboard />
        </div>
        <div className="p-5">
          <div className="my-5">
            <div className="my-4">
              <h1 className="text-2xl font-bold text-center">Check Students Enroll in Program</h1>
            </div>
            <label className="text-sm font-bold mx-2 text-gray-600">Input Program Name:</label>
            <input 
              type="text" 
              className="appearance-none text-gray-600 outline-none bg-gray-100 rounded px-2 py-1 placeholder:text-sm" 
              placeholder="Program Name"
              onChange={(e) => setSelectedProgram(e.target.value)}
              value={selectedProgram} 
            />
            <button 
              onClick={handleSearch} 
              className="bg-green-600 py-1 px-2 rounded ml-2 text-white text-sm hover:bg-green-700"
            >
              Search
            </button>
          </div>

          <div className="gap-x-5">
            <p className="text-1xl py-3">Students in Program: {count}</p>
            {error && <p className="text-red-500">{error}</p>}
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-200">Profile Picture</th>
                  <th className="px-4 py-2 border border-gray-200">Registration No</th>
                  <th className="px-4 py-2 border border-gray-200">Name</th>
                  <th className="px-4 py-2 border border-gray-200">Father Name</th>
                  <th className="px-4 py-2 border border-gray-200">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-200">
                      <img src={student.profilePic} className="w-10 h-10 rounded" alt="profile_pic" />
                    </td>
                    <td className="px-4 py-2 border border-gray-200">{student.studentID}</td>
                    <td className="px-4 py-2 border border-gray-200">{student.studentName}</td>
                    <td className="px-4 py-2 border border-gray-200">{student.fatherName}</td>
                    <td className="px-4 py-2 border border-gray-200">{student.studentEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramSummary;
