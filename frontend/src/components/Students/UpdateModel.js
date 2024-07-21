import React from "react";

const UpdateModel = ({ title, onClose, onUpdate, student }) => {
    const [formData, setFormData] = React.useState({ ...student });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    <form onSubmit={handleSubmit} className="mt-2">
                        <label className="block">
                            <span className="text-gray-700  text-sm font-bold block my-2" >Student Name:</span>
                            <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="appearance-none  bg-gray-200 text-gray-700 text-sm font-bold border  rounded py-1 px-4 mb-1 ml-2 leading-tight focus:outline-none focus:bg-white w-full" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 text-sm font-bold block my-2">Father's Name:</span>
                            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="appearance-none  bg-gray-200 text-gray-700 text-sm font-bold border  rounded py-1 px-4 mb-1 ml-2 leading-tight focus:outline-none focus:bg-white w-full" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 text-sm font-bold block my-2">Contact Number:</span>
                            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="appearance-none  bg-gray-200 text-gray-700 text-sm font-bold border  rounded py-1 px-4 mb-1 ml-2 leading-tight focus:outline-none focus:bg-white w-full" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 text-sm font-bold block my-2">Email:</span>
                            <input type="email" name="studentEmail" value={formData.studentEmail} onChange={handleChange} className="appearance-none  bg-gray-200 text-gray-700 text-sm font-bold border  rounded py-1 px-4 mb-1 ml-2 leading-tight focus:outline-none focus:bg-white w-full" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 text-sm font-bold block my-2">Date of Birth:</span>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="appearance-none  bg-gray-200 text-gray-700 text-sm font-bold border  rounded py-1 px-4 mb-1 ml-2 leading-tight focus:outline-none focus:bg-white w-full" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 text-sm font-bold block my-2">Gender:</span>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="appearance-none bg-gray-200 text-gray-700 text-sm font-bold border  rounded py-1 px-4 mb-1 ml-2 leading-tight focus:outline-none focus:bg-white w-full">
                                <option>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-gray-700 text-sm font-bold block my-2">Address:</span>
                            <textarea name="address" value={formData.address} onChange={handleChange} className="appearance-none  bg-gray-200 text-gray-700 text-sm font-bold border  rounded py-1 px-4 mb-1 ml-2 leading-tight focus:outline-none focus:bg-white w-full" />
                        </label>
                        <div className="mt-4">
                            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Update
                            </button>
                        </div>
                    </form>
                    <div className="items-center px-4 py-3">
                        <button onClick={onClose} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateModel;