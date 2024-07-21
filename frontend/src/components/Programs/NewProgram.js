import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import axios from 'axios';

const NewProgram = () => {
    const [program_key, setProgram_key] = useState("");
    const [hod_name, setHod_name] = useState("");
    const [year, setYear] = useState("");
    const [program_name, setProgram_name]= useState("");
    const [batch_year, setBatch_year]= useState("");


    const handleAssignYear= async(e)=>{
        e.preventDefault();
        if(!program_key || !batch_year){
            console.log("Program key and Batch year required");
            return;
        }

        try{
            const response = await axios.post("http://localhost:5000/api/users/assignBatchYear",{

            program_key: program_key,
            batch_year: batch_year,
            });

            console.log("Response: ", response.data);

            alert("Batch/Year assigned Successfully");

        }catch(e){
            console.error("Error: ", e.response.data);

        }
        //reset from fields
        setProgram_key("");
        setBatch_year("")
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!program_name) {
            console.log("Program name required");
        }
        if (!hod_name) {
            console.log("HOD name required");
        }

        try {
            const response = await axios.post("http://localhost:5000/api/users/newprogram", {
                program_key: program_key,
                program_name: program_name,
                hod_name: hod_name,
                year: year,
            });
            console.log("Response: ", response.data);
            alert("Program Successfully Added");
        } catch (error) {
            console.error("Error: ", error.response.data);
        }

        // Reset form fields
        setProgram_name("");
        setHod_name("");
        setProgram_key("");
        setYear("");
    };

    return (
        <>
            <div className="flex">
                <div>
                    <Dashboard />
                </div>
                <div className="p-7">
                    <div className="">
                        <h1 className="text-2xl font-bold my-3">Introduce New Programs</h1>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="text-sm font-bold my-2 block">
                                        New Program
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow w-full border focus:outline-none text-sm px-2 py-1"
                                        onChange={(e) => setProgram_key(e.target.value)}
                                        value={program_key}
                                        placeholder="Enter the New Program"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="text-sm font-bold my-2 block">
                                        Program Abbrivation
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow w-full border focus:outline-none text-sm px-2 py-1"
                                        onChange={(e) => setProgram_name(e.target.value)} // Add this line
                                        value={program_name}
                                        placeholder="Enter Program Describution"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="text-sm font-bold my-2 block">
                                        HOD
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow w-full border focus:outline-none text-sm px-2 py-1"
                                        onChange={(e) => setHod_name(e.target.value)} // Add this line
                                        value={hod_name}
                                        placeholder="Enter the Name of HOD"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="text-sm font-bold my-2 block">
                                        Batch Assign
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow w-full border focus:outline-none text-sm px-2 py-1"
                                        onChange={(e) => setYear(e.target.value)} // Add this line
                                        value={year}
                                        placeholder="Enter the Name of HOD"
                                    />
                                </div>
                              
                                <div className="">
                                    <button
                                        type="submit"
                                        className="bg-green-500 py-2 px-4 rounded text-sm font-bold text-white hover:bg-green-700"
                                    >
                                        Add New Program
                                    </button>
                                </div>
                            </form>
                        </div>


                        <div className="my-3">
                            <h1>Assign the Batch to Different Programs</h1>

                            <form onSubmit={handleAssignYear}>
                                <div className="mb-3">
                                    <label className="text-sm font-bold my-2 block">
                                        Program Key
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow w-full border focus:outline-none text-sm px-2 py-1"
                                        onChange={(e) => setProgram_key(e.target.value)}
                                        value={program_key}
                                        placeholder="Enter Program Key"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="text-sm font-bold my-2 block">
                                        Batch/Year
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow w-full border focus:outline-none text-sm px-2 py-1"
                                        onChange={(e) => setBatch_year(e.target.value)}
                                        value={batch_year}
                                        placeholder="Enter Batch/Year"
                                    />
                                </div>

                                <div className="">
                                    <button
                                        type="submit"
                                        className="bg-green-500 py-2 px-4 rounded text-sm font-bold text-white hover:bg-green-700"
                                    >
                                        Assign Batch/Year
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewProgram;
