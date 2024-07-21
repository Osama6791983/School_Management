import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import axios from 'axios';

const AddStudents = () => {
  const [formData, setFormData] = useState({
    selectedBatch: "",
    selectedProgram: "",
    registrationNo: "",
    program_name: "",
    studentName: "",
    fatherName: "",
    contactNumber: "",
    studentEmail: "",
    dob: "",
    gender: "",
    address: "",
    profilePicUrl:null
  });

  
   

  const [batches, setBatches] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [programName, setProgramName] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchBatchAndPrograms = async () => {
      try {
        const batchResponse = await axios.get("http://localhost:5000/api/users/batches");
        const programResponse = await axios.get("http://localhost:5000/api/users/programs");
        const programNameResponse = await axios.get("http://localhost:5000/api/users/program-name");
        setBatches(batchResponse.data);
        setPrograms(programResponse.data);
        setProgramName(programNameResponse.data);
      } catch (error) {
        console.error("Error fetching batches and programs: ", error);
      }
    };
    fetchBatchAndPrograms();
  }, []);


  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0])
  };




  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,

      
    });

    console.log(e.target.value);
    
  };



  const submitData = async(e)=> {
    e.preventDefault();
      //validation logic

    

     

       
      //create student ID
      const studentID= `${formData.selectedBatch}-${formData.selectedProgram}-${formData.registrationNo}`;

      
      //prepare form data with student ID
      const data = new FormData();

      data.append('studentID', studentID);

     
      if(selectedFile){
        data.append('profilePic', selectedFile);
      }
      
      for(const key in formData){
        data.append(key, formData[key]);
      }



      

      //send post request to the backend
      try{
        
        const response =  await axios.post("http://localhost:5000/api/users/add-student",data,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        });
       
        
      
        console.log("Response: ", response.data);
        console.log('Selected file:', selectedFile);
        alert("Student Added Successfully");

        setFormData({
          selectedBatch: "",
          selectedProgram: "",
          registrationNo: "",
          program_name: "",
          studentName: "",
          fatherName: "",
          contactNumber: "",
          studentEmail: "",
          dob: "",
          gender: "",
          address: "",
          setSelectedFile: null

        })

      }catch(err){

       console.log("Err: ", err.response.data);
        
      }
  };

  return (
    <>
      <div className="flex">
        <div className=""><Dashboard /></div>
        <div className="p-5">
          <h1 className="font-bold text-1xl mb-2">Add New Students</h1>
          <form className="w-full max-w-lg py-1" onSubmit={submitData}>
            <div className="flex flex-wrap -mx-3 mb-6  px-3 gap-x-3 ">
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-3 pr-8 rounded leading-tight focus:outline-none text-sm placeholder:text-sm focus:bg-white focus:border-gray-500"
                  name="selectedBatch" value={formData.selectedBatch} onChange={handleChange}>
                  <option value="">Select Batch</option>
                  {batches.map((batch, index) => (
                    <option key={index} value={batch.batch_year}>{batch.batch_year}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div className="relative">
                <select className="block appearance-none text-sm placeholder:text-sm w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                  name="selectedProgram" value={formData.selectedProgram} onChange={handleChange}>
                  <option value="">Select Program</option>
                  {programs.map((program, index) => (
                    <option key={index} value={program.program_shortkey}>{program.program_shortkey}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div className="relative ">
                <input className="appearance-none text-sm placeholder:text-sm block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Reg No" type="number" name="registrationNo" value={formData.registrationNo} onChange={handleChange} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="studentName">
                  Student Name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="studentName" type="text" placeholder="Enter Student Name" name="studentName" value={formData.studentName} onChange={handleChange} />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fatherName">
                  Father Name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="fatherName" type="text" placeholder="Enter Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contactNumber">
                  Contact Number
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="contactNumber" type="text" placeholder="Enter the Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="studentEmail">
                  Student Email
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="studentEmail" type="email" placeholder="Enter Student Email" name="studentEmail" value={formData.studentEmail} onChange={handleChange} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dob">
                  Date of Birth
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="dob" type="date" name="dob" value={formData.dob} onChange={handleChange} />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profilePicUrl">
                  Upload Picture
                </label>
                <input type="file" className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                  name="profilePicUrl" onChange={handleFileChange} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="program_name">
                  Program
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="program_name" name="program_name" value={formData.program_name} onChange={handleChange}>
                    <option value="">Select Program</option>
                    {programName.map((program, index) => (
                      <option key={index} value={program.program_name}>{program.program_name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                Home Address
              </label>
              <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="address" type="text" placeholder="Type the Student Home Address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="flex flex-wrap -mx-3 mb-3 px-3">
              <button className="bg-green-600 px-6 py-2 text-white rounded-md shadow-md hover:bg-red-700" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStudents;
