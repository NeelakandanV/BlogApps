// Importing necessary components
import express from "express";
import { Validate } from "../Utils/Auth.js";
import { allBlogs, blogsBy_Author, blogsBy_Tags, blogsBy_Title, createBlogs, deleteBlog, oneBlog, updateBlog } from "../Controllers/blogsController.js";

const router = express.Router();

// setting up routes
router.post("/publishBlog",Validate,createBlogs)
router.get("/Blogs",Validate,allBlogs)
router.get("/Blogs/:id",Validate,oneBlog)                 // Blog Id
router.put("/updateBlog/:id",Validate,updateBlog)          // Blog Id
router.delete("/deleteBlog/:id",Validate,deleteBlog)       // Blog Id

router.get("/BlogsByTitle",Validate,blogsBy_Title)
router.get("/BlogsByTags",Validate,blogsBy_Tags)
router.get("/BlogsByAuthor",Validate,blogsBy_Author)

export default router;