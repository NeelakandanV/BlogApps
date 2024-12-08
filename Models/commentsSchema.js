// Importing necessary Components
import mongoose from "mongoose";


// Validation Schema
const commentSchema = new mongoose.Schema({
    Comment :{
        type : String,
        required : true
    },
    User :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required : true
    },
    Blog :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'blogs',
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
},{
    versionKey : false
})

const comments = mongoose.model("comments",commentSchema);
export default comments;