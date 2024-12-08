// Importing neceesary components
import jwt from "jsonwebtoken";
import blogs from "../Models/blogsSchema.js";
import comments from "../Models/commentsSchema.js";
import users from "../Models/usersSchema.js";
import likes from "../Models/likesSchema.js";

// Create a Blog - POST - only verified users
export const createBlogs = async(req,res)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const find_User = await users.findById(data.Id)
        if(find_User && req.body.Content){
            if(find_User.Status=="Verified"){
                req.body.Author = data.Id
                const newBlog = await blogs.create(req.body)
                await newBlog.save()
                const find_User = await users.findByIdAndUpdate({_id:data.Id},{$push:{Blogs:newBlog._id}})
                res.status(200).send({message:"Blog Published Successfully!",newBlog})
            }
            else{
                res.status(403).send({message:"Only verified Users can create blogs"})
            }
        }
        else{
            res.status(400).send({message:"Error in publishing blog"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Get all blogs - GET
export const allBlogs = async(req,res)=>{
    try{
        const find_Blogs = await blogs.find().populate('Author',{First_Name:1,Last_Name:1}).populate('Comments',{Comment:1,User:1}).populate('Likes',{User:1})
        if(find_Blogs){
            res.status(200).send({message:"Blogs found",BlogData:find_Blogs})
        }
        else{
            res.status(404).send({message:"Blog not found"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Get a particular blog - GET
export const oneBlog = async(req,res)=>{
    try{
        const blog_Id = req.params.id;
        const find_blogs = await blogs.findById(blog_Id).populate('Author',{First_Name:1,Last_Name:1}).populate('Comments',{Comment:1})
        const countComments = await comments.countDocuments({Blog:blog_Id})
        const countLikes = await likes.countDocuments({Blog:blog_Id})
        if(find_blogs){
            res.status(200).send({message:"Blog found!",Blog:find_blogs,Comments:countComments,Likes:countLikes})
        }
        else{
            res.status(404).send({message:"Blog not found"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Update a blog - PUT  - Only authors can update
export const updateBlog = async(req,res)=>{
    try{
        const Blog_Id = req.params.id;
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        const data = await jwt.decode(token)
        const blog_data = await blogs.findById(Blog_Id)
        if(blog_data.Author == data.Id){
            blog_data.Title = req.body.Title || blog_data.Title
            blog_data.Content = req.body.Content || blog_data.Content
            blog_data.Tags = req.body.Tags || blog_data.Tags
            const updatedBlog = await blog_data.save()
            res.status(200).send({message:"Blog updated successfully",updatedBlog})
        }
        else{
            res.status(403).send({message:"Only Author can update"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Delete a blog - Delete - Only Author or Admin
export const deleteBlog = async(req,res)=>{
    try{
        const blog_Id = req.params.id;
        const token = req.cookies.token || req.headers.authorization.split(" ")[1]
        const data = await jwt.decode(token)
        const find_blog = await blogs.findById(blog_Id)
        if(find_blog){
            if((data.Id==find_blog.Author) || (data.Role=="Admin")){
                const remove_BlogFromUser = await users.findByIdAndUpdate({_id:find_blog.Author},{$pull:{Blogs:blog_Id}})
                const del_Blog = await blogs.findByIdAndDelete(blog_Id)
                try{
                    const del_comments = await comments.deleteMany({Blog:blog_Id})
                    const del_likes = await likes.deleteMany({Blog:blog_Id})
                    res.status(200).send({message:"Blog deleted successfully"})
                }
                catch(err){
                    res.status(200).send({message:"Blog deleted successfully"})
                }
            }
            else(
                res.status(403).send({message:"Only Author or Admin can delete blog"})
            )
        }
        else{
            res.status(404).send({message:"Blog not found"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}


// Find blogs by Title - GET 
export const blogsBy_Title = async(req,res)=>{
    try{
        if(req.body.Title){
            const find_Blogs = await blogs.find({Title:req.body.Title}).populate('Author',{First_Name:1,Last_Name:1})
            if(find_Blogs.length>0){
                res.status(200).send({message:"Blogs found!",find_Blogs})
            }
            else{
                res.status(400).send({message:"Blog not found"})
            }
        }
        else{
            res.status(400).send({message:"Title Required"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Find blogs by Tags - GET
export const blogsBy_Tags = async(req,res)=>{
    try{
        if(req.body.Tags){
            const find_Blogs = await blogs.find({Tags:req.body.Tags}).populate('Author',{First_Name:1,Last_Name:1})
            if(find_Blogs.length>0){
                res.status(200).send({message:"Blogs found!",find_Blogs})
            }
            else{
                res.status(400).send({message:"Blog not found"})
            }
        }
        else{
            res.status(400).send({message:"Tag Required"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}

// Find blogs by Author - GET
export const blogsBy_Author= async(req,res)=>{
    try{
        if(req.body.First_Name){
            const find_Blogs = await users.find({First_Name:req.body.First_Name},{First_Name:1,Last_Name:1}).populate("Blogs",{Title:1,Content:1,Tags:1})
            if(find_Blogs.length>0){
                res.status(200).send({message:"Blogs found!",find_Blogs})
            }
            else{
                res.status(400).send({message:"Blog not found"})
            }
        }
        else{
            res.status(400).send({message:"Author Required"})
        }
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
}