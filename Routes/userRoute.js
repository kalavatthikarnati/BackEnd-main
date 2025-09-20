import express from "express";
import {registerUser,LoginUser} from "../Controller/userController.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", LoginUser);

export default userRouter;
