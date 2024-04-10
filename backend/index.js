const express=require('express')
const cors=require('cors')
const db=require('./db')
const bodyParser=require('body-parser')
const authMiddleware = require('./authMiddleware')
const userController=require('./controllers/userController')
const app=express()
app.use(bodyParser.json())
app.use(express.json());
const port=3000
app.use(cors())
app.post('/register', upload.single('image'),userController.signup)
app.post('/login',userController.login)
app.listen(port,()=>
{
    console.log(`running on ${port}`)
})