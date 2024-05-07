import express from "express";
import { getuser,adduser,loginUser, getBookingofuser } from "../controllers/user-cont.js";
 
const userrouter=express.Router();
userrouter.get("/",getuser);
userrouter.post("/",adduser);
userrouter.post("/login",loginUser);
userrouter.get("/:id",getBookingofuser);

export default userrouter;
