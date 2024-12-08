// Importing necessary Components
import mongoose from "mongoose";
import validator from "validator";

// Validation Schema
const userSchema = new mongoose.Schema({
    First_Name : {
        type : String,
        required : true
    },
    Last_Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true ,
        lowercase : true,
        validate : (value) =>{
            return validator.isEmail(value);
        }
    },
    Password : {
        type : String,
        required : true
    },
    Role : {
        type : String,
        default : "User"
    },
    Status :{
        type : String,
        default : "Not Verified"
    },
    VerifyPin : {
        type : String
    },
    ResetPin : {
        type : String
    },
    Blogs : [{
        type : mongoose.Schema.Types.ObjectId,ref:'blogs'
    }],
    Comments : [{
        type : mongoose.Schema.Types.ObjectId,ref:'comments'
    }],
    Likes : [{
        type : mongoose.Schema.Types.ObjectId,ref:'likes'
    }],
    createdAt : {
        type : Date,
        default : Date.now
    },
},{
    versionKey : false
})

const users = mongoose.model("users",userSchema);
export default users;