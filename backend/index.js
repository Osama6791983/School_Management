require('dotenv').config();
const express= require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const displayRoutes= require("./routes/displayRoutes");
const AddStudents= require("./routes/AddStudentRoute");
const manageStudent = require('./routes/mangeStudent');

const deleteStudent= require("./routes/deleteStudent");
const studentCount = require('./routes/TotalStudentandClasses');
const programSummary = require('./routes/programSummary');

const LoginLogout = require('./routes/Login');
const bodyParser= require("body-parser");





const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


const PORT = process.env.PORT || 5000;

// app.use(express.json());


app.use(cors());




app.use('/api/users', LoginLogout);

app.use("/api/users", userRoutes);
app.use("/api/users", displayRoutes);
app.use("/api/users",AddStudents);
app.use("/api/users", manageStudent);
app.use("/api/users", deleteStudent);
app.use('/api/users', studentCount);
app.use('/api/users', programSummary);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})