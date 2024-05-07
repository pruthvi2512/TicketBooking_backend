import mongoose from "mongoose";
import Bookings from "../models/bookingschema.js";
import Movie from "../models/MovieSchema.js"
import User from "../models/userschema.js"
 import { ObjectId } from "mongodb";

export const newbooking=async(req,res)=>{
const {movie,date,seatnumber,user}=req.body;
let existingmovie;
let existinguser;
try{
     existingmovie=await Movie.findById(movie);
     existinguser =await User.findById(user); 
}catch(err){

}
let booking;
try{
    booking=new Bookings({
        movie,
        date:new Date(`${date}`),
        seatnumber,
        user});
const session= await mongoose.startSession();
 session.startTransaction();
 existinguser.bookings.push(booking);
 existingmovie.bookings.push(booking);
await existinguser.save({session});
await existingmovie.save({session});
         await booking.save({session});
        await session.commitTransaction();
}catch(err){
return console.log(err);
 }
 if(!booking){
    return res.status(500).json({message:"unable to book"});
 }

 return res.status(200).json(booking);

};

export const getbookingById=async(req,res)=>{
         const id=req.params.id;
         console.log(id);
         
         let booking;
         try{
            booking=await Bookings.findById(new ObjectId(id));
         }catch(err){
             return console.log(err);
         }
         if(!booking){
            console.log(booking);
              return res.status(400).json({message:"error"});
         }
         return res.status(200).json(booking);
};

export const deletebooking=async(req,res)=>{
    const id=req.params.id;
    let booking;
    try{
       booking=await Bookings.findByIdAndDelete(id).populate("user movie");
       console.log(booking);
       const session=await mongoose.startSession();
       session.startTransaction();
       
       await booking.user.bookings.pull(booking);
       await booking.movie.bookings.pull(booking);
       await booking.movie.save({session});
       await booking.user.save({session});
       session.commitTransaction();
       console.log("hii");

    }catch(err){
        return console.log(err);
    }
    return res.status(200).json({message:"deleted"});
};