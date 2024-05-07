import express from "express";
import { addmovies, getallmovie, getmoviebyid } from "../controllers/movie-cont.js";
const movierouter=express.Router();
movierouter.post("/",addmovies);
movierouter.get("/",getallmovie);

movierouter.get("/:id",getmoviebyid);
export default movierouter;