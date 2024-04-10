const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')



module.exports.signup=async(req,res)=>
{ 
    
    try{
        const userExists=await userModel.findOne({email:req.body[0].email});
        if(userExists)
        {
            return res.status(200)
            .send({message:"User already exists",success:false})
        }
        const password=req.body[0].password
        console.log("password",password)
        const salt= await bcrypt.genSalt(10)
        console.log("salt",salt)
        const hashedPassword=await bcrypt.hash(password,salt)
        console.log("hshd",hashedPassword)
        req.body[0].password=hashedPassword
        console.log("bodypass",req.body[0].password)
        const newuser=new userModel(req.body)
        console.log("newuser",newuser)
        await newuser.save()
        return res.status(200).send({message:"User created successfully",success:true})
    }
    catch(error)
    {
        return res.status(500).send({message:"Error creating user",success:false,error})
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
            const token=jwt.sign({id:userExists._id},"KEERTHANA",
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