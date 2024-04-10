const mongoose=require('mongoose')
const {Schema}=mongoose;

const userSchema=new Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {type:String,
        required:true
    },
    password:
    {   type:String,
        required:true
    },
    confirmPassword:
    {
        type:String,
        required:true
    },
    phoneNumber:
    {
        type:String,
        required:true
    },
    img:
    {
        type:String,
        default:""
    },

    
},)
module.exports=mongoose.model('user',userSchema)