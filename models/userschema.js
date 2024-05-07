import mongoose from "mongoose";

const userschema= new mongoose.Schema({
    name:{
          type:String,
          required:true,
    },
    email:{
        type:String,
          required:true,
          unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minLength:6
    },
    bookings:[{
          type:mongoose.Types.ObjectId,
          ref:"Booking"
    }]
});
export default mongoose.model("user",userschema);
