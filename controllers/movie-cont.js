import { decrypt } from "dotenv";
import Movie from "../models/MovieSchema.js";
import admin from "../models/adminSchema.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//add movies
export const addmovies=async(req,res)=>{
       const extractedtoken=req.headers.authorization.split(" ")[1];
       if(!extractedtoken&&extractedtoken.trim()===""){
        return res.status(404).json({message:"token not found"});
       }
       let adminid;
       const Screatekey="abcdefgh";
       jwt.verify(extractedtoken,Screatekey,(err,decrypted)=>{
           if(err){
              return res.status().json({message:`${err.message}`});
           }
           else{
            adminid=decrypted.id;
            return ;
           }
       });

       //create movie
       const {title,posterImage,description,releaseDate,actors,price}=req.body;
       let movie;
       try{
        movie=new Movie({
            title,
            posterImage,
            description,
            releaseDate:new Date(`${releaseDate}`),
            actors,
            price,
            admin:adminid
        });
const session=await mongoose.startSession();
const adminuser=await admin.findById(adminid);
 session.startTransaction();
  await movie.save({session});
  
  adminuser.addmovies.push(movie);
  await adminuser.save({session});
  await session.commitTransaction();
       }catch(err){
            return res.status(400).json({message:"error"});
       };
       

       return  res.status(200).json(movie);

       
};
//getallmovie
  export const getallmovie=async(req,res)=>{
    let movies;
    try{
    movies=await Movie.find();

    }catch(err){

    }
    if(!movies){
        console.log("error while fetching");
    }
    return res.status(200).json(movies);
  };

  //findbyid
  export const getmoviebyid=async(req,res)=>{
    const id=req.params.id;
    let movie;
    try{
        movie= await Movie.findById(id);
    }catch(err){
        console.log(err);
    }
    if(!movie){
        console.log("invalid id");
    }
    return res.status(200).json(movie);

  };