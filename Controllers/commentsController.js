//Importing necessary components
import jwt from "jsonwebtoken";
import blogs from "../Models/blogsSchema.js";
import users from "../Models/usersSchema.js";
import comments from "../Models/commentsSchema.js";


// Creating comments - POST
export const postComment = async(req,res)=>{
    try{
        const Blog_Id = req.params.id;
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const find_User = await users.findById(data.Id)
        const find_Blogs = await blogs.findById(Blog_Id)
        const find_Comments  = await comments.find({Blog:Blog_Id,User:data.Id})
        if(find_User.Status=="Verified"){
            if(find_Blogs && find_Comments.length==0){
                req.body.User = data.Id
                req.body.Blog = Blog_Id
                const createComment = await comments.create(req.body)
                await createComment.save()
                const updateBlog = await blogs.findByIdAndUpdate({_id:Blog_Id},{$push:{Comments:createComment._id}})
                const updateUser = await users.findByIdAndUpdate({_id:data.Id},{$push:{Comments:createComment._id}})
                res.status(200).send({message:"Comment posted",createComment})
            }
            else{
                res.status(400).send({message:"User already commented for the post"})
            }
        }
        else{
            res.status(403).send({message:"Only verified users can comment"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Deleting a comment - delete
export const deleteComment = async(req,res)=>{
    try{
        const comment_Id = req.params.id;
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const find_Comments = await comments.findById(comment_Id)
        if((data.Id==find_Comments.User) || (data.Role=="Admin")){
            const updateBlog = await blogs.findOneAndUpdate({Comments:comment_Id},{$pull:{Comments:comment_Id}})
            const updateUser = await users.findOneAndUpdate({Comments:comment_Id},{$pull:{Comments:comment_Id}})
            const del_Comments = await comments.findByIdAndDelete(comment_Id)
            res.status(200).send({message:"Comment deletion Successful"})
        }
        else{
            res.status(400).send({message:"Only Commented User or Admin can delete"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}