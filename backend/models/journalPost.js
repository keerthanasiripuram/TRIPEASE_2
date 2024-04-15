const mongoose=require('mongoose')
const {Schema}=mongoose;

const journalPostSchema=new Schema({
    name:
    {
        type:String,
        required:true
    },
    desc:{
        type:String,
        default:""
    },
    users: {
        type: [Types.ObjectId],
        ref: 'user',
        default: []
    },
    images: {
        type: [String],
        default: []
    }
},
{
    timestamps: true,
    versionKey: false
}
)
module.exports=mongoose.model('post',journalPostSchema)