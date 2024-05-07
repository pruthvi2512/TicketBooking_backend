import mongoose from "mongoose";
import Movie from "./MovieSchema";
const bookingschema= new mongoose.Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
    },
    date:{
        type:Date,
        required:true,
        
    },
    seatnumber:{
        type:Number,
        required:true,
        unique:true,
        min:1,
        max:60,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true,
    }
});
export default mongoose.model("Booking",bookingschema);