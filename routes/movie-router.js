import express from "express";
import { addmovies, getallmovie, getmoviebyid } from "../controllers/movie-cont";
const movierouter=express.Router();
movierouter.post("/",addmovies);
movierouter.get("/",getallmovie);

movierouter.get("/:id",getmoviebyid);
export default movierouter;