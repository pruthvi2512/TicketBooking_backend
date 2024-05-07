import mongoose from "mongoose";
import Movie from "./MovieSchema.js"
const adminSchema= new mongoose.Schema({
    
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
    addmovies:[{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
    }]
});
export default mongoose.model("admin",adminSchema);