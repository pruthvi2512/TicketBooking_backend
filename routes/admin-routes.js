import express from "express";
const adminrouter=express.Router();
import { addadmin,adminlogin } from "../controllers/admin-cont.js";
adminrouter.post("/signup",addadmin );
adminrouter.post("/login",adminlogin);


export default adminrouter;