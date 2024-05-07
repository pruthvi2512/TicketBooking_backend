import Admin from "../models/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config'


export const addadmin=async(req,res)=>{
const {email,password}=req.body;
if(!email&&email.trim()===""&&!password&&password.trim()){
    return res.status(422).json({message:"invalid input"});
   }
   let existingadmin;
   try{
     existingadmin= await Admin.findOne({email});
   }catch(err){
    return console.log(err);
    };
    if(existingadmin){
       return res.status(422).json({message:"already present"});;
    }
   let admin;
   const hashedpass=bcrypt.hashSync(password);
   try{
      admin=new Admin({email,password:hashedpass});
      admin=await admin.save();

   }catch(err){
         return console.log(err);
   };
   if(!admin){
    return res.status(422).json({message:"unable to strore"});
   }
   return res.status(200).json({admin});
};

export const adminlogin=async(req,res)=>{
    const {email,password}=req.body;
if(!email&&email.trim()===""&&!password&&password.trim()){
    return res.status(422).json({message:"invalid input"});
   }
   let existingadmin;
   try{
     existingadmin= await Admin.findOne({email});
   }catch(err){
    return console.log(err);
    };
    if(!existingadmin){
     return res.status(400).json({message:"admin not found"});
    }

    const ispasscorrect=bcrypt.compareSync(password,existingadmin.password);
     if(!ispasscorrect){
        return res.status(400).json({message:"incorrect pass"});
     }
     
     const token=jwt.sign({id:existingadmin._id},process.env.Skey,{
      expiresIn:"7d",
     });
     return res.status(200).json({message:"login succesful",token,id:existingadmin._id})
      
};