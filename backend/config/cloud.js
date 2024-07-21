const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = multer.memoryStorage();  //use memory storage

 
       

cloudinary.config({ 
  cloud_name: 'dp58v1nlv', 
  api_key: '148462511885529', 
  api_secret: 'E9xRpmZR1uZt-gfj16Y-Mnvnaxg' 
});
 


const upload= multer({storage: storage});
module.exports = {cloudinary, upload};


