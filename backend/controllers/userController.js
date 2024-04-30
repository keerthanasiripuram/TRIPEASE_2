const userModel=require('../models/userModel')
const journalModel=require('../models/journalPost')
const groupModel=require('../models/groupSchema')
const DocumentModel=require('../models/DocumentsSchema')
const ExpenseListSchema=require('../models/ExpenseSchema')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const path = require('path');
const twilio = require('twilio');
const { Types } = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const twilioClient = twilio(process.env.twilio_userid, process.env.twilio_password);

module.exports.signup=async(req,res,next)=>
{ 
    
    try{
        let registerData = JSON.parse(req.body.registerData)
        const userExists=await userModel.findOne({email:registerData.email});
        if(userExists)
        {
            return res.status(200)
            .send({message:"User already exists",success:false})
        }
        const password=registerData.password
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        registerData.password=hashedPassword
        registerData.profileImage = req.file.filename
        delete registerData.confirmPassword
        const newuser=new userModel(registerData)
        await newuser.save()
        return res.status(200).send({message:"User created successfully",success:true})
    }
    catch(error)
    {
        return res.status(500).send({message:error.message,success:false,error})
    }
}


module.exports.login=async(req,res)=>
{ 
    try{
        const userExists=await userModel.findOne({email:req.body.email});
        if(!userExists)
        {
            return res.status(200)
            .send({message:"User doesn't exists",success:false})
        }
        const isMatch=await bcrypt.compare(req.body.password,userExists.password)
        if(!isMatch)
        {
            return res.send({message:"password is incorrect",success:false})
        }
        else{
            const token=jwt.sign({id:userExists._id},process.env.secretKey,
            {
                expiresIn:"1d"
            })
            console.log(token)
        return res.send({message:"login successful",success:true,token})
        }
    }
    catch(error)
    {
        return res.status(500).send({message:"Error logging user",success:false,error})
    }
}


module.exports.createJournalPost=async(req,res,next)=>
{ 
    
    try{
        let DocumentData=JSON.parse(req.body.postData)
        DocumentData = {
            ...DocumentData,
            user:new Types.ObjectId("6617e43487d0d90e66cf8d13"),
            images: req.files.map(data=>data.filename)
        }
        const newpost=new journalModel(DocumentData)
        await newpost.save()
        return res.status(200).send({message:"Post created successfully",success:true})
    }
    catch(error)
    {
        return res.status(500).send({message:error.message,success:false,error})
    }
}

module.exports.getPostData=async(req,res,next)=>
{ 
    
    try{
        const postData=await journalModel.find()
        //console.log("93",postData)
        return res.status(200).send({message:"Posts sent successfully",success:true,data:postData})
    }
    catch(error)
    {
        return res.status(500).send({message:error.message,success:false,error})
    }
}

module.exports.getParticipants=async(req,res,next)=>
{ 
    
    try{
        const friendsData=await userModel.find()
        //console.log("93",friendsData)
        return res.status(200).send({message:"Participants data fetched successfully",success:true,data:friendsData})
    }
    catch(error)
    {
        return res.status(500).send({message:error.message,success:false,error})
    }
}



    module.exports.getFriendsData=async(req,res,next)=>
    { const userIdsToAdd = req.body.participants
        
        try{
            // Find the users by their IDs
        const users = await userModel.find({ _id: { $in: userIdsToAdd } });

        // Create a new group and add users to the members array
        const newGroup = new groupModel({
            name: 'New Group',
            description: 'Description of the new group',
            members: users.map(user => user._id)// Add only user IDs to the members array
        });
        console.log(newGroup)
        // Save the group
        const group = await newGroup.save();
            return res.status(200).send({message:"group created successfully",success:true,data:group})
        }
        catch(error)
        {
            return res.status(500).send({message:error.message,success:false,error})
        }
    }

  module.exports.request_OTP=async (req, res) => {
        const { phoneNumber } = req.body;
        console.log(req.body)
        console.log(phoneNumber)
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otp)
        try {
            // Save OTP and expiration time to database
            const user = await userModel.findOneAndUpdate({ phoneNumber:phoneNumber }, {
                otp,
                otpExpiration: Date.now() + 5 * 60 * 1000 // OTP expires in 5 minutes
            }, { upsert: true, new: true });
    
            // Send OTP via SMS using Twilio
            await twilioClient.messages.create({
                body: `Your OTP for Travel Document Management: ${otp}`,
                to: phoneNumber,
                from: '+12513158412'
            });
    
            res.status(200).send('OTP sent successfully!');
        } catch (error) {
            console.error('Error sending OTP:', error);
            res.status(500).send('Failed to send OTP');
        }
    };
   module.exports.uploadDoc=async(req,res,next)=>
    { 
    //console.log("uploadDoc")
        //console.log(req)
        try{
            //let DocumentData=JSON.parse(req.body.DocumentData)
            //console.log(DocumentData)
            let DocumentData = {
                user:new Types.ObjectId("6621e1098fc1e66759295b54"),
                images: req.files.map(data=>data.filename)
            }
            const newDocument=new DocumentModel(DocumentData)
            await newDocument.save()
            return res.status(200).send({message:"Documents stored  successfully",success:true})
        }
        catch(error)
        {
            return res.status(500).send({message:error.message,success:false,error})
        }
    }

module.exports.expenseData=async(req,res,next)=>
{   
    
    console.log(req.body)
    try
    {
        const foundExpense =await ExpenseListSchema.findOne({ user: "6617e43487d0d90e66cf8d13", budgetName: "manali" })
        if (foundExpense) {
            // Add new expenses to the expenseList array
            foundExpense.expenseList.push(req.body);
            let expenseAmount=+req.body.expenseAmount
            foundExpense.totalAmount+=expenseAmount
            // Save the updated document
            const updatedExpense = await foundExpense.save();
            
           // console.log("Expenses added successfully:", updatedExpense);
            return res.status(200).send({message:"Expenses addedd successfully",success:true})
        } else {
            // Document not found
           // throw new Error("Document not found");
            return res.status(200).send({message:"Document not found .create budgetname ",success:true})
        }
       
    }
    catch(error)
        {
            return res.status(500).send({message:error.message,success:false,error})
        }
}

module.exports.addTripName=async(req,res,next)=>
{   
    console.log(req.body)
    try
    {
        let TripNameData = {
            user:new Types.ObjectId("6617e43487d0d90e66cf8d13"),
            budgetName: req.body.addTripName
        }
        console.log(TripNameData)
        const newTripName=new ExpenseListSchema(TripNameData)
        await newTripName.save()
        return res.status(200).send({message:"Trip Name stored successfully",success:true})
    }
    catch(error)
        {
            return res.status(500).send({message:error.message,success:false,error})
        }
}

module.exports.displayExpenses=async(req,res,next)=>
{ 
    
    try{
        const ExpenseData=await ExpenseListSchema.find({user:'6617e43487d0d90e66cf8d13',budgetName: "manali"})
        console.log("93",ExpenseData[0].expenseList)
        return res.status(200).send({message:"Expense data fetched successfully",success:true,data:ExpenseData[0].expenseList})
    }
    catch(error)
    {
        return res.status(500).send({message:error.message,success:false,error})
    }
}
module.exports.checkValidity=async(req,res,next)=>
{ 
    console.log(req.body)
    try{
        const otp=await userModel.findById('6621e1098fc1e66759295b54')
        console.log(otp.otp,req.body.otp)
        console.log(typeof(req.body.otp))
        console.log(typeof(otp.otp))
        if(otp && otp.otp === req.body.otp)
        {   
           /* const documents=await DocumentModel.find({user:'6621e1098fc1e66759295b54'}) why array 
            console.log(documents)*/
            const documents=await DocumentModel.find({user:'6621e1098fc1e66759295b54'})
            console.log(documents[0].images)
            return res.status(200).send({message:"Documents fetched successfully",success:true,data:documents[0].images})
        }
        else
        {
            return res.status(200).send({message:"Enter correct OTP",success:true})
        }
        
    }
    catch(error)
    {
        return res.status(500).send({message:error.message,success:false,error})
    }
}
module.exports.translateText=async(req,res,next)=>
{
    const translateParams = {
        text: 'Hello, how are you?',
        source: 'en', // Source language code (e.g., 'en' for English)
        target: 'es', // Target language code (e.g., 'es' for Spanish)
      };
      try {
        const translationResult = await languageTranslator.translate(translateParams);
        console.log(JSON.stringify(translationResult, null, 2));
        return res.status(200).send({message:"Translated successfully",success:true,data:translationResult})
      } catch (err) {
        console.log('error:', err);
        return res.status(500).send({message:error.message,success:false,error})
      }
}
/*
module.exports.fetchNames=async(req,res,next)=>
{
    console.log("participants",req.body.participants)
    let participants=req.body.participants
    for(let i=0;i<participants.length;i++)
    {
        try
        {
        console.log(participants[i])
        const group = await groupModel.findById(participants[i]).populate('members').exec();
        console.log('Group with populated members:', group);
        return res.status(200).send({message:"Fetched names",success:true,data:group})
        }
        catch(error)
        {
            return res.status(500).send({message:error.message,success:false,error})
        }
    }
}
*/
module.exports.fetchNames=async(req,res,next)=>
{
    console.log("participants",req.body.participants)
    let participants=req.body.participants
    let names=[]
        try
        {
        for(let i=0;i<participants.length;i++){
        console.log(participants[i])
        const group_mem= await userModel.findById(participants[i])
        console.log(group_mem)
        const group_mem_name=group_mem.name
        names.push(group_mem_name)
        }
        console.log(names)
        return res.status(200).send({message:"Fetched names",success:true,data:names})
        }
        catch(error)
        {
            return res.status(500).send({message:error.message,success:false,error})
        }
}