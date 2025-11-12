import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import User from '../models/user.js';

const signup=async(req,res)=>{
try{
const{name,email,password}=req.body;
console.log("data recieved", name, email, password);
const userexist=await User.findOne({email});
if(userexist){
    return res.status(400).json({message:"user already exist"})
}
const salt=await bcrypt.genSalt(15);
const hashedPassword=await bcrypt.hash(password,salt)
const newUser=new User({name,email,password:hashedPassword})
await newUser.save();
res.status(201).json({message:"new user created successfully"})
}
catch(error){
    console.log(error.message)
    res.status(500).json({message:error.message})
}
}
const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(200).json({message:"user not found"})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"invalid password"})
        }
        const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:"1hr"})
        res.status(200).json({message:"login successfully", user,token})
    }catch(error){
        console.error("error in login:", error)
        res.status(500).json({message:"internal server error"})
    }}
export{signup , login}