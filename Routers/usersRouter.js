// Importing necessary components
import express from "express";
import { CreateUser, ForgotPassword, LoginUser, Logout, PasswordReset, verifyUser, VerifyUserLink } from "../Controllers/AuthController.js";
import { isAdmin, Validate } from "../Utils/Auth.js";
import { allUsers, banUser, Dashboard,  deleteUser, oneUser, Update_Profile } from "../Controllers/usersController.js";

const router = express.Router();

// setting up routes
// Only for Admins
router.get("/allUsers",Validate,isAdmin,allUsers)
router.put("/banUser/:id",Validate,isAdmin,banUser)  // User Id

// -- For all users
router.get("/Dashboard",Validate,Dashboard)
router.put("/updateUser",Validate,Update_Profile)
router.get("/oneUser/:id",Validate,oneUser)              // User Id
router.delete("/deleteUser",Validate,deleteUser)


router.post("/Register",CreateUser)
router.post("/Login",LoginUser)
router.put("/ForgotPassword",ForgotPassword)
router.put("/ResetPassword/:id/:pin/:token",PasswordReset)   // User Id
router.put("/UserVerification",VerifyUserLink)      
router.get("/VerifyUser/:id/:pin/:token",verifyUser)       // User Id
router.get("/Logout",Logout)



export default router;