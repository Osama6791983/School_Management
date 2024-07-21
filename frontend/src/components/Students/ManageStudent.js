import React, { useState } from "react";
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import UpdateModel from './UpdateModel'; // Assuming UpdateModel is correctly imported

const ManageStudent = () => {
    const [registrationNo, setRegistrationNo] = useState("");
    const [student, setStudent] = useState(null);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({});

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/search-student/${registrationNo}`);
            setStudent(response.data);
            setError('');
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError("Student not found");
            } else {
                setError("Error fetching data");
            }
            setStudent(null);
        }
    };

    const handleDelete = async (studentID) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/delete-student/${studentID}`);
            setStudent(null);  // Clear the student data to remove the table
            alert("Student deleted successfully");
        } catch (err) {
            alert("Failed to delete student");
        }
    };

    const handleEdit = (student) => {
        setEditData(student);
        setIsModalOpen(true);
    };

    const handleUpdate = async (formData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/users/update-student/${formData.studentID}`, formData);
            setStudent(response.data); // Assuming the API returns the updated student data
            setIsModalOpen(false);
            alert('Student updated successfully');
        } catch (err) {
            alert('Failed to update student');
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex">
            <Dashboard />
            <div className="p-7">
                <h1 className="text-center text-xl font-bold mb-3">Update Student Information</h1>
                <div className="my-4 ">
                    <input
                        type="text"
                        className="text-sm appearance-none bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white mr-2"
                        value={registrationNo}
                        onChange={(e) => setRegistrationNo(e.target.value)}
                        placeholder="Search Student By Registration No."
                    />
                    <button onClick={handleSearch} className="bg-green-600 px-6 py-2 text-white rounded-md shadow-md hover:bg-red-700">Search</button>
                    {error && <p>{error.data}</p>}
                </div>
                {student && (
                    <div className="flex gap-x-5 ">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Student ID</th>
                                    <th className="border px-4 py-2">Student Name</th>
                                    <th className="border px-4 py-2">Student Picture</th>
                                    <th className="border px-4 py-2">Manage Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">{student.studentID}</td>
                                    <td className="border px-4 py-2">{student.studentName}</td>
                                    <td className="border px-4 py-2">
                                        <img src={student.profilePic} alt="Student" className="w-12 h-12 rounded" />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex gap-4 justify-center">
                                            <div className="text-blue-500 cursor-pointer" onClick={() => handleEdit(student)}><FaEdit /></div>
                                            <div className="text-red-500 cursor-pointer" onClick={() => handleDelete(student.studentID)}><MdDeleteOutline /></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {isModalOpen && (
                            <UpdateModel
                                title="Edit Student"
                                onClose={handleClose}
                                onUpdate={handleUpdate}
                                student={editData}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageStudent;