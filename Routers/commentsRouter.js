// Importing necessary components
import express from "express";
import { deleteComment, postComment } from "../Controllers/commentsController.js";
import {Validate} from "../Utils/Auth.js"

const router = express.Router();

// setting up routes
router.post("/createComment/:id",Validate,postComment)  // Blog Id 
router.delete("/comment/:id",Validate,deleteComment)   // Comment Id

export default router;