import User from "../models/userschema.js";
import bcrypt from "bcryptjs";
import Bookings from "../models/bookingschema.js";


export const getuser= async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
       return next(err);
    }
    if(!users){
       return res.status(500).json({message:"error"});

    }
    return res.status(200).json({users});

};
export const adduser=async(req,res)=>{
   const {name,email,password} =req.body;
   if(!name&&name.trim()===""&&!email&&email.trim()===""&&!password&&password.trim()){
    return res.status(422).json({message:"invalid input"});
   }
   const newPass=bcrypt.hashSync(password);
   let user;
   try{
    user=new User({name,email,password:newPass});
    user= await user.save();

   }catch(err){
    return console.log("error in saving");
   }
   if(!user){
    return res.status(500).json({message:"error while adding"});
   }
   return res.status(200).json({user});
};
export const loginUser= async(req,res)=>{
     const {email,password}=req.body;
   //   if(!email&&email.trim()===""&&!password&&password.trim()){
   //      return res.status(422).json({message:"invalid input"});
   //     }
     let presentuser;
     try{
        presentuser=await User.findOne({email});

     }catch(err){
        return console.log("error while finding user");

     }
     if(!presentuser){
        return res.status(404).json({message:"user not found"});

     }
     const ispasscorrect=bcrypt.compareSync(password,presentuser.password);
     if(!ispasscorrect){
        return res.status(400).json({message:"incorrect pass"});
     }
     return res.status(200).json({message:"login succesful",id:presentuser._id})
};

export const getdetails=async(req,res)=>{
   const id= req.params.id;
   let user;
   try{
      user= await User.find({_id:id});
   }catch(err){
      console.log(err);
   };

   if(!user){
      res.status(400).json({message:"error"});

   }

   return res.status(200).json(user);
};