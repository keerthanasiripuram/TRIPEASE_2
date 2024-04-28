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
app.use('/TripEase/backend/uploadJournal', express.static('D:/TripEase/backend/uploadJournal'));
app.use('/TripEase/backend/uploadDocuments', express.static('D:/TripEase/backend/uploadDocuments'));
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

const DocumentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
      let uploadPath = path.join(__dirname,process.env.PROFILE_IMAGE_DOCUMENT_UPLOAD_PATH)
    cb(null, uploadPath); // Destination folder for storing uploads
  },
  filename: function (req, file, cb) {
      let filename = new Date().getTime().toString() + file.originalname 
    cb(null, filename); 
  }
});
const DocumentUpload = multer({ storage: DocumentStorage});

//End Points
app.post('/register', upload.single('image'),userController.signup)
app.post('/login',userController.login)
app.post('/a',journalUpload.array('images'),userController.createJournalPost)
app.get('/get-post-data',userController.getPostData)
app.post('/get-friends-data',userController.getFriendsData)
app.get('/get-participants',userController.getParticipants)
app.post('/request-OTP',userController.request_OTP)
app.post('/uploadDoc',DocumentUpload.array('images'),userController.uploadDoc)
app.post('/expenseData',userController.expenseData)
app.post('/addTripName',userController.addTripName)
app.get('/displayExpenses',userController.displayExpenses)
app.post('/checkValidity',userController.checkValidity)
app.post('/translateText',userController.translateText)
app.post('/fetchNames',userController.fetchNames)
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