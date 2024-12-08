// Importing necessary Components
import mongoose from "mongoose";


// Validation Schema
const likeSchema = new mongoose.Schema({
    Like :{
        type: String,
        default : "1",
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

const likes = mongoose.model("likes",likeSchema);
export default likes;