// Importing necessary Components
import mongoose from "mongoose";


// Validation Schema
const blogSchema  = new mongoose.Schema({
    Title :{
        type : String,
        required : true
    },
    Content :{
        type : String,
        required : true
    },
    Author :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required : true
    },
    Tags : [{
        type : String
    }],
    Comments :[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'comments'
        }
    ],
    Likes :[
        {type : mongoose.Schema.Types.ObjectId,ref:'likes'}
    ],
    createdAt :{
        type : Date,
        default : Date.now()
    }
},{
    versionKey : false
})

const blogs = mongoose.model("blogs",blogSchema);
export default blogs;