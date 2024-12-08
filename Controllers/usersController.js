// Importing necessary components
import jwt from "jsonwebtoken";
import users from "../Models/usersSchema.js";
import blogs from "../Models/blogsSchema.js";
import comments from "../Models/commentsSchema.js";
import likes from "../Models/likesSchema.js";

// For Dashboard - GET
export const Dashboard = async(req,res)=>{
    try{
        const User_Count = await users.countDocuments();
        const Blogs_Count = await blogs.countDocuments();
        const likes_Count = await likes.countDocuments();
        const comments_Count = await comments.countDocuments();
        res.status(200).send({message:"Data fetched!",TotalUser:User_Count,TotalBlogs:Blogs_Count,TotalComments:comments_Count,TotalLikes:likes_Count})
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// For Updating User Data - PUT
export const Update_Profile = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const find_User = await users.findById(data.Id)
        if(find_User){
            find_User.First_Name = req.body.First_Name || find_User.First_Name;
            find_User.Last_Name = req.body.Last_Name || find_User.Last_Name;
            find_User.Email = find_User.Email;
            find_User.Password = find_User.Password; 

            const UpdatedUser = await find_User.save();
            res.status(200).send({message:"Profile Updated!",UpdatedUser})
        }
        else{
            res.status(400).send({message:"User not Found!"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Get all users - GET - Only admin
export const allUsers = async(req,res)=>{
    try{
        const find_Users = await users.find().populate('Blogs',{Title:1}).populate('Comments',{Comment:1,Blog:1}).populate('Likes',{Blog:1})
        if(find_Users){
            res.status(200).send({message:"Users found",find_Users})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Get Particular User -GET
export const oneUser = async(req,res)=>{
    try{
        const User_Id = req.params.id;
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        if(User_Id && (User_Id==data.Id  || data.Role=="Admin")){
            const find_User = await users.findById(User_Id).populate('Blogs',{Title:1})
            const find_Comment = await comments.find({User:User_Id},{Comment:1}).populate('Blog',{Title:1})
            const find_like = await likes.find({User:User_Id},{Like:0,User:0,_id:0,createdAt:0}).populate('Blog',{Title:1})
            if(find_User){
                res.status(200).send({message:"User fetch Successful!",UserData:find_User,UserLikes:find_like,UserComments:find_Comment})
            }
            else{
                res.status(400).send({message:"Data not found"})
            }
        }
        else{
            res.status(404).send({message:"User not found"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Delete User - DELETE
export const deleteUser = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const find_User = await users.findById(data.Id)
        if(find_User){
            const delete_User = await users.findByIdAndDelete(data.Id)
            res.status(200).send({message:"User Deleted Successfully"})
        }
        else{
            res.status(404).send({message:"User not found",err})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Ban User from creating blogs and comments - PUT -  Only Admin
export const banUser = async(req,res)=>{
    try{
        const User_Id = req.params.id;
        const find_User = await users.findById(User_Id)
        if(find_User){
            const updateStatus = await users.findByIdAndUpdate({_id:User_Id},{$set:{Status:"Banned"}})
            await updateStatus.save()
            res.status(200).send({message:"User banned Successfully"})
        }
        else{
            res.status(404).send({message:"User not found"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}