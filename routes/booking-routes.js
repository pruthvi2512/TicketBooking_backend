import express from "express";
import { deletebooking, getbookingById, newbooking } from "../controllers/booking-cont.js";
const bookingrouter=express.Router();
bookingrouter.post("/",newbooking);
bookingrouter.get("/:id",getbookingById);
bookingrouter.delete("/:id",deletebooking);

export default bookingrouter;