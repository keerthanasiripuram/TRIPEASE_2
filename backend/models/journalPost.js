const mongoose=require('mongoose')
const {Schema}=mongoose;

const journalPostSchema=new Schema({
    name:
    {
        type:String,
        required:true
    },
    img:
    {
        type:String,
        default:""
    },
    desc:{
        type:String,
        default:""
    },
    
},
{
    timestamps: true,
    versionKey: false
}
)
module.exports=mongoose.model('post',journalPostSchema)