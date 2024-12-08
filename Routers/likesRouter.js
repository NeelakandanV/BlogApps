// Importing necessary components
import express from "express";
import { Validate } from "../Utils/Auth.js";
import { postlikes, removeLike } from "../Controllers/likesController.js";

const router = express.Router();

// setting up routes
router.post("/addLike/:id",Validate,postlikes)     // Blog Id
router.delete("/Like/:id",Validate,removeLike)       // Like Id

export default router;