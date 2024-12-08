//Importing necessary components
import jwt from "jsonwebtoken";
import blogs from "../Models/blogsSchema.js";
import users from "../Models/usersSchema.js";
import likes from "../Models/likesSchema.js";


// Creating likes - POST
export const postlikes = async(req,res)=>{
    try{
        const Blog_Id = req.params.id;
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const find_Blogs = await blogs.findById(Blog_Id)
            req.body.User = data.Id
            req.body.Blog = Blog_Id
            const createLike = await likes.create(req.body)
            await createLike.save()
            const updateBlog = await blogs.findByIdAndUpdate({_id:Blog_Id},{$push:{Comments:createLike._id}})
            const updateUser = await users.findByIdAndUpdate({_id:data.Id},{$push:{Comments:createLike._id}})
            res.status(200).send({message:"Blog Liked"})
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Deleting a Like- delete
export const removeLike = async(req,res)=>{
    try{
        const like_id = req.params.id;
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const find_likes = await likes.findById(like_id)
        if(data.Id==find_likes.User){
            const updateBlog = await blogs.findOneAndUpdate({Likes:like_id},{$pull:{Likes:like_id}})
            const updateUser = await users.findOneAndUpdate({Likes:like_id},{$pull:{Likes:like_id}})
            const del_Likes = await likes.findByIdAndDelete(like_id)
            res.status(200).send({message:"Post disliked"})
        }
        else{
            res.status(400).send({message:"Only Liked can remove likes"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}