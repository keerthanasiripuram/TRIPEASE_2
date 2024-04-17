const userModel=require('../models/userModel')
const journalModel=require('../models/journalPost')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


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
{   console.log(37,req.body)
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
            return res.send(200).send({message:"password is incorrect",success:false})
        }
        else{
            const token=jwt.sign({id:userExists._id},process.env.secretKey,
            {
                expiresIn:"1d"
            })
            console.log(token)
        return res.status(200).send({message:"login successful",success:true,token})
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
        let journalPostData=JSON.parse(req.body.JournalData)
        const newpost=new journalModel(journalPostData)
        await newpost.save()
        return res.status(200).send({message:"Post created successfully",success:true})
    }
    catch(error)
    {
        return res.status(500).send({message:error.message,success:false,error})
    }
}