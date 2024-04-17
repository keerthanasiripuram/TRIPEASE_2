const express=require('express')
const cors=require('cors')
const db=require('./db')
const bodyParser=require('body-parser')
const authMiddleware = require('./authMiddleware')
const userController=require('./controllers/userController')
const multer = require('multer');
const app=express()

//dot env setup
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

//Middlewares for server
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())


//Multer Code for image Uploading
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = path.join(__dirname,process.env.PROFILE_IMAGE_UPLOAD_PATH )
      cb(null, uploadPath); // Destination folder for storing uploads
    },
    filename: function (req, file, cb) {
        let filename = new Date().getTime().toString() + file.originalname 
      cb(null, filename); 
    }
  });
  
const upload = multer({ storage: storage });

//Multer Code for image Uploading
const journalStorage = multer.diskStorage({
  destination: function (req, file, cb) {
      let uploadPath = path.join(__dirname,process.env.PROFILE_IMAGE_JOURNAL_UPLOAD_PATH)
    cb(null, uploadPath); // Destination folder for storing uploads
  },
  filename: function (req, file, cb) {
      let filename = new Date().getTime().toString() + file.originalname 
    cb(null, filename); 
  }
});

const journalUpload = multer({ storage: journalStorage});
console.log("dedsdsdsds")
console.log(journalUpload)
//End Points
app.post('/register', upload.single('image'),userController.signup)
app.post('/login',userController.login)
app.post('/a',journalUpload.array('images'),userController.createJournalPost)
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//Server Connection
const port= process.env.PORT
app.listen(port,()=>
{
    console.log(`running on ${port}`)
})