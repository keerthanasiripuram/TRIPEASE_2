const express = require('express')
const cors = require('cors')
const { spawn } = require('child_process');
const db = require('./db')
const bodyParser = require('body-parser')
const authMiddleware = require('./authMiddleware')
const userController = require('./controllers/userController')
const multer = require('multer');
const app = express()
const verifyToken = require("./middlewares/token-verification")

//dot env setup
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

//Middlewares for server
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())
app.use('/TripEase/backend/uploadJournal', express.static('D:/TripEase/backend/uploadJournal'));
app.use('/TripEase/backend/uploads', express.static('D:/TripEase/backend/uploads'));
app.use('/TripEase/backend/uploadDocuments', express.static('D:/TripEase/backend/uploadDocuments'));
//Multer Code for image Uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = path.join(__dirname, process.env.PROFILE_IMAGE_UPLOAD_PATH)
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
    let uploadPath = path.join(__dirname, process.env.PROFILE_IMAGE_JOURNAL_UPLOAD_PATH)
    cb(null, uploadPath); // Destination folder for storing uploads
  },
  filename: function (req, file, cb) {
    let filename = new Date().getTime().toString() + file.originalname
    cb(null, filename);
  }
});
const journalUpload = multer({ storage: journalStorage });

const DocumentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = path.join(__dirname, process.env.PROFILE_IMAGE_DOCUMENT_UPLOAD_PATH)
    cb(null, uploadPath); // Destination folder for storing uploads
  },
  filename: function (req, file, cb) {
    let filename = new Date().getTime().toString() + file.originalname
    cb(null, filename);
  }
});
const DocumentUpload = multer({ storage: DocumentStorage });

//End Points
app.post('/register', upload.single('image'), userController.signup)
app.post('/login', userController.login)
app.post('/a', verifyToken, journalUpload.array('images'), userController.createJournalPost)
app.get('/get-post-data', verifyToken, userController.getPostData)
app.post('/get-friends-data', verifyToken, userController.getFriendsData)
app.get('/get-participants', verifyToken, userController.getParticipants)
app.post('/request-OTP', verifyToken, userController.request_OTP)
app.post('/uploadDoc', verifyToken, DocumentUpload.array('images'), userController.uploadDoc)
app.post('/expenseData', verifyToken, userController.expenseData)
app.post('/addTripName', verifyToken, userController.addTripName)
app.get('/displayExpenses', verifyToken, userController.displayExpenses)
app.post('/checkValidity', verifyToken, userController.checkValidity)
app.post('/translateText', verifyToken, userController.translateText)
app.post('/fetchNames', verifyToken, userController.fetchNames)
app.get('/displayTripList', verifyToken, userController.displayTripList)
app.post('/displaySelectedTripData', verifyToken, userController.displaySelectedTripData)
app.post('/filters', verifyToken, execute)
app.post('/displayFeature',verifyToken,tourism)
// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

//Server Connection
const port = process.env.PORT
app.listen(port, () => {
  console.log(`running on ${port}`)
})

async function execute(req,res,next) {
  console.log(req.body)
  const destination = req.body.destination;
const checkIn= req.body.checkIn;
const checkOut=req.body.checkOut;
const rating=req.body.rating;
// var category = '0';
// if(req.body.checked==true)
//   {
//     category='1'
//   }
  console.log(destination,checkIn,checkOut,rating)
  let hoteldata=[]
  try {
    // Path to the Python script
    const pythonScriptPath = './hotels.py';

    // Path to the CSV file
    const csvFilePath = './csv_data.csv';

    // Spawn Python process with the Python script path and CSV file path as arguments
    const pythonProcess = spawn('python', [pythonScriptPath, csvFilePath, destination,checkIn,checkOut,rating]);
    //let dataBuffer = Buffer.alloc(0);
    // Handle stdout data from Python script
    //console.log(pythonProcess)
    pythonProcess.stdout.on('data', (data) => {
      
      console.log(`Python script stdout: ${data}`);
      hoteldata=data
      //dataBuffer = Buffer.concat([dataBuffer, data]);
      
    });

    // Handle error event
    pythonProcess.on('error', (error) => {
      console.error(`Error executing Python script: ${error}`);
    });

    // Handle exit event
    pythonProcess.on('exit', (code) => {
      console.log(`Python script exited with code ${code}`);

      // Convert the buffer data to a string
      //const dataString = dataBuffer.toString('utf-8');
      
      // Parse the string as JSON
      //const hoteldata = JSON.parse(dataString);
      
      // Send response with fetched hotel data
      res.status(200).json({ message: "Fetched hotels data", success: true, data: hoteldata});
    });
  } catch (error) {
    console.error(`Error executing Python scripts: ${error}`);
    res.status(500).json({ message: 'Error executing Python scripts', success: false });
  }
}
async function tourism(req,res,next) {
  console.log(req.body)
  let placesdata=''
  try {
    // Path to the Python script
    const pythonScriptPath = './places.py';

    // Path to the CSV file
    const csvFilePath = './Top Indian Places to Visit.csv';
    const spot=req.body.selectedFeature
    // Spawn Python process with the Python script path and CSV file path as arguments
    const pythonProcess = spawn('python', [pythonScriptPath, csvFilePath,spot]);
    //let dataBuffer = Buffer.alloc(0);
    // Handle stdout data from Python script
    //console.log(pythonProcess)
    pythonProcess.stdout.on('data', (data) => {
      
      console.log(`Python script stdout: ${data}`);
      placesdata = data
      //dataBuffer = Buffer.concat([dataBuffer, data]);
      
    });

    // Handle error event
    pythonProcess.on('error', (error) => {
      console.error(`Error executing Python script: ${error}`);
    });

    // Handle exit event
    pythonProcess.on('exit', (code) => {
      console.log(`Python script exited with code ${code}`);    
      res.status(200).json({ message: "Fetched hotels data", success: true,data:placesdata}); 
    });
      
   
  } catch (error) {
    console.error(`Error executing Python scripts: ${error}`);
    res.status(500).json({ message: 'Error executing Python scripts', success: false });
  }
}
