import express from "express";
import { getuser,adduser,loginUser, getdetails } from "../controllers/user-cont.js";
 
const userrouter=express.Router();
userrouter.get("/",getuser);
userrouter.post("/",adduser);
userrouter.post("/login",loginUser);
userrouter.get("/:id",getdetails);


export default userrouter;
