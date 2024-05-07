import mongoose from "mongoose";
import admin from "./adminSchema.js"
import Booking from "./bookingschema.js"
const movieSchema=new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide movie title'],
        trim: true
      },
      posterImage: {
        type: String,
        required: [true, 'Please provide movie image']
      },
      description:{
        type:String,
        required:true,

      },
      releaseDate:{
        type:Date,
        required:true,

      },
      actors:[{
        type:String,
      }],
      price:{
        type:String,
        required:true,
      },
      bookings:[{type:mongoose.Types.ObjectId,ref:"Booking"}],
      admin:{
        type:mongoose.Types.ObjectId,
        ref:"admin",
        required:true
       
      }

});
export default mongoose.model("Movie",movieSchema);