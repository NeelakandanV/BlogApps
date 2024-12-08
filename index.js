import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBconnect from "./Database/ConfigDb.js";
import requestLogger from "./Utils/logger.js";
import unknownEndpoint from "./Utils/Error.js";
import usersRouter from "./Routers/usersRouter.js";
import blogsRouter from "./Routers/blogsRouter.js";
import commentsRouter from "./Routers/commentsRouter.js";
import likesRouter from "./Routers/likesRouter.js";
import cookieParser from "cookie-parser";

// Server setup
const app = express();

//dotenv Configuration
dotenv.config();

//Establishing Database Connection
DBconnect();

// Applying Middlewares
//Enabling cors
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());

// Checking Backend Server
app.get("/",(req,res)=>{
    try{
        res.status(200).send({message:"Server working Fine"})
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error",err})
    }
})

app.use("/api/v1/users",usersRouter);
app.use("/api/v1/blogs",blogsRouter);
app.use("/api/v1/comments",commentsRouter);
app.use("/api/v1/likes",likesRouter);

// Error handler for Unknown Enpoint
app.all("*",unknownEndpoint)



// Setting up the port
const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Server Running on ${port}`)
})